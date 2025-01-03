package com.twitter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "poll_choices")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PollChoice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "poll_choice_id")
    private Integer pollChoiceId;

    @ManyToOne
    @JoinColumn(name = "poll_id")
    @JsonIgnore
    private Poll poll;

    @Column(name = "poll_choice_text")
    private String choiceText;

    @OneToMany
    @Column
    private Set<AppUser> votes;
}
