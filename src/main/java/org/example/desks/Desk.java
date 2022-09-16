package org.example.desks;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "desks")
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Desk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NonNull
    private String name;
}
