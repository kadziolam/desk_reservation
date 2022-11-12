package org.example;

import org.example.filters.JwtRequestFilter;
import org.example.models.AuthenticationRequest;
import org.example.models.AuthenticationResponse;
import org.example.users.User;
import org.example.users.UserRepository;
import org.example.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class})
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @RestController
    class HelloWorldController {

        @Autowired
        UserRepository userRepository;

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private JwtUtil jwtTokenUtil;

        @RequestMapping({"/hello"})
        public String firstPage(@AuthenticationPrincipal User user) {
            return "Hello World " + user.getUsername();
        }

        public User getCurrentUser(@AuthenticationPrincipal User user) {
            return user;
        }

        @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
        public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
                );
            } catch (BadCredentialsException e) {
                throw new Exception("Incorrect username or password", e);
            }


            final Optional<User> user = userRepository
                    .findByUsername(authenticationRequest.getUsername());

            if (user.isPresent()) {
                final String jwt = jwtTokenUtil.generateToken(user.get().getUsername());
                return ResponseEntity.ok(new AuthenticationResponse(jwt));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

        }

    }

    @EnableWebSecurity
    class WebSecurityConfig extends WebSecurityConfigurerAdapter {

        @Autowired
        UserRepository userRepository;

        @Autowired
        private JwtRequestFilter jwtRequestFilter;

        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userRepository);
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return NoOpPasswordEncoder.getInstance();
        }

        @Override
        @Bean
        public AuthenticationManager authenticationManagerBean() throws Exception {
            return super.authenticationManagerBean();
        }

        @Override
        protected void configure(HttpSecurity httpSecurity) throws Exception {
            httpSecurity.csrf().disable()
                    .authorizeRequests().antMatchers("/authenticate").permitAll().
                    anyRequest().authenticated().and().
                    exceptionHandling().and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        }
    }
}