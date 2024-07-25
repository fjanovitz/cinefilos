Feature: user history
    As an user
    I want to have my posts and reviews listed somewhere
    So that others and I can see what I did

Scenario: Access content through reviews tab
    Given the user is on the page "profile/gusta"
    And there is a review for the movie with id "2809ee44-1149-42bb-ad9d-e1abce2eee2e"
    And the user is on the "reviews_tab" tab
    When the user clicks the card of the movie with id "2809ee44-1149-42bb-ad9d-e1abce2eee2e"
    Then the user goes to the page "contents/movies/Interestelar"

Scenario: Access edit content through reviews tab
    Given the user is logged in as "gusta"
    And the user is on its profile
    And there is a review for the movie with id "2809ee44-1149-42bb-ad9d-e1abce2eee2e"
    And the user is on the "reviews_tab" tab
    When the user clicks the "update-review-button-movies-2809ee44-1149-42bb-ad9d-e1abce2eee2e" button
    Then the user goes to the page "profile/gusta/movies/Interestelar/update_review"

Scenario: Delete review through reviews tab
    Given the user is logged in as "gusta"
    And the user is on its profile
    And there is a review for the movie with id "2809ee44-1149-42bb-ad9d-e1abce2eee2e"
    And the user is on the "reviews_tab" tab
    When the user clicks the "delete-review-button-movies-2809ee44-1149-42bb-ad9d-e1abce2eee2e" button
    Then there is no longer a review for the movie with id "2809ee44-1149-42bb-ad9d-e1abce2eee2e"

Scenario: Go to posts tab
    Given the user is on the page "profile/gusta"
    When the user clicks the "posts_tab" button
    Then the user is now on the "posts_tab" tab

Scenario: Visualize post
    Given the user is on the page "profile/gusta"
    When the user clicks the "posts_tab" button
    Then there is a post with id "0073" and title "já ganhou o filme do ano"
