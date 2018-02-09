$(document).ready(function() {

    let questions_easy = [
        { text: "How many ballades did Chopin compose?", options: ['3', '4', '5', '6'], answer: '4' },
        { text: "How many piano concertos did Chopin compose?", options: ['1', '2', '3', '4'], answer: '2' },
        { text: "What was the first name of Robert Schumann’s wife?", options: ['Clara', 'Jane', 'Marianne', 'Elisabeth'], answer: 'Clara' },
        { text: "How many piano sonatas did Beethoven compose?", options: ['16', '25', '32', '40'], answer: '32' },
        { text: "How many etudes did Chopin compose?", options: ['20', '22', '25', '27'], answer: '27' },
        { text: "Which country was Sibelius from?", options: ['Finland', 'Sweden', 'Estonia', 'Russia'], answer: 'Finland' },
    ]

    let questions_medium = [
        { text: "What key signature is Mozart’s 40th symphony in? ", options: ['C minor', 'D major', 'B♭ major', 'G minor'], answer: 'G minor' },
        { text: "Which piano sonata by Beethoven is commonly known as the Waldstein?", options: ['Sonata No. 23', 'Sonata No. 5', 'Sonata No. 21', 'Sonata No. 31'], answer: 'Sonata No. 21' },
        { text: 'Which symphony by Mendelssohn has been given the nickname “Italian”?', options: ['1', '4', '10', '17'], answer: '4' },
        { text: 'How many movements does Beethoven’s “Hammerklavier” sonata contain?', options: ['2', '3', '4', '6'], answer: '4' },
        { text: "How many variations are there in Bach’s Goldberg Variations?", options: ['30', '45', '55', '70'], answer: '30' },
        { text: "Which country was Henri Vieuxtemps from?", options: ['Belgium', 'France', 'Luxembourg', 'Austria'], answer: 'Belgium' },
    ]

    let questions_hard = [
        { text: "Who is Rachmaninoff’s 4th Piano Concerto dedicated to?", options: ['Nikolai Medtner', 'Alexander Scriabin', 'Pyotr Ilyich Tchaikovsky', 'Mikhail Glinka'], answer: 'Nikolai Medtner' },
        { text: "What was Liszt’s first composition to be published?", options: ['Variations on a Waltz by Diabelli', 'Sonata in B minor', 'Nuages gris', 'Der Papsthymnus'], answer: 'Variations on a Waltz by Diabelli' },
        { text: "How many songs did Liszt compose in English?", options: ['0', '1', '2', '3'], answer: '1' },
        { text: "What year was Mendelssohn born?", options: ['1784', '1809', '1832', '1902'], answer: '1809' },
        { text: "What key is Mendelssohn’s fourth symphony in?", options: ['B minor', 'C minor', 'A♭ major', 'A major'], answer: 'A major' },
        { text: "Which country’s citizenship did Chopin obtain in 1835?", options: ['Luxembourg', 'Poland', 'France', 'Germany'], answer: 'France' },
        { text: 'Which of the following is not a part of the "Miroirs" by Ravel?', options: ['Noctuelles', 'Des pas sur la neige', 'Alborada del gracioso', 'La vallée des cloches'], answer: 'Des pas sur la neige' },        
        { text: "Which composer is the 'the Silence of Järvenpää' related to?", options: ['Jean Sibelius', 'Heino Kaski', 'Edward Grieg', 'Arvo Pärt'], answer: 'Jean Sibelius' },        
    ]

    let questions_very_hard = [
        { text: "Which famous composer attempted suicide by throwing themselves into the Rhine river in 1854?", options: ['Schubert', 'Liszt', 'Paganini', 'Schumann'], answer: 'Schumann' },
        { text: "How old was Mendelssohn when he started taking piano lessons?", options: ['2', '4', '6', '8'], answer: '6' },
        { text: "What did Robert Schumann study before he began to study composition?", options: ['Law', 'Medicine', 'Philosophy', 'German literature'], answer: 'Law' },
        { text: 'Which piece by Mendelssohn has been regarded as "marking the beginning of his maturity as a composer"?', options: ['Piano Sonata No. 1 in E major', 'String Octet in E-flat major', 'Capriccio in F sharp minor', ' String Quintet No.1 in A major'], answer: 'String Octet in E-flat major' },
        { text: "Where did Mendelssohn’s violin concerto in E minor premiere?", options: ['Vienna', 'Paris', 'Leipzig', 'Warsaw'], answer: 'Leipzig' },
        { text: "After which major event in his life in 1827 did Liszt move to Paris?", options: ['His father’s death', 'His mothers’s death', 'His brother’s suicide attempt', 'Severe depression'], answer: 'His father’s death' },
        { text: "How many songs did Robert Schumann write in 1940?", options: ['3', '12', '49', '138'], answer: '138' },
        { text: "Which composer was not part of the 'Société des Apaches'?", options: ['Max Bruch', 'Maurice Ravel', 'Igor Stravinsky', 'Manuel de Falla'], answer: 'Max Bruch' },
    ]

    let answering_time = 15000; // 15 seconds
    var score;

    $('#back_button').click(function () {
        window.location.href='index.html';
    });

    let difficulty = localStorage.getItem("difficulty");
    var questions;

    if (difficulty == "Easy") {
        questions = questions_easy;
    } else if (difficulty == "Medium") {
        questions = questions_medium;
    }  else if (difficulty == "Hard") {
        questions = questions_hard;
    } else {
        questions = questions_very_hard;
    }

    $('#question_text')[0].style.fontSize='12vh';
    $('#question_text').text(difficulty + " Quiz");
    $('#subtitle').text("Press any button below to begin!");
    $('#difficulty').text("Difficulty: " + difficulty);

    $('.btn').each(function(i, button) {
        button.onclick = function() {
            play();
        };
    });
  
    var bar = new ProgressBar.Line('.wrapper', {
        strokeWidth: 4,
        duration: answering_time,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '100%' }
    });
      
    var previous;    

    function play() {
        $('#question_text')[0].style.fontSize='6vh';        
        score = 0;
        previous = [];
        new_question();
    }

    var did_game_end;    

    function new_question() {
        did_game_end = false
        bar.set(0);
        bar.animate(1.0, function () {
            bar.set(0);
            end();
         });

         is_new = false;

        var question;
         while (!is_new) {
            question = questions[Math.floor(Math.random() * questions.length)]; // Selects a random item from the questions
            if (!previous.includes(question)) {
                is_new = true;
            }
         }

         previous.push(question);

         $("#question_text").text(question.text);
         $("#subtitle").text("Score: " + score);

         mixed = shuffle(question.options.slice())
         $('.button_text').each(function(i, button) {
             $(button).text(mixed[i]);
         });

         $('.btn').each(function(i, button) {
            button.onclick = function() {
                if ($(button).children(".button_text").text() == question.answer) {
                    score++;
                    if (score == questions.length) {
                        bar.set(0);
                        did_game_end = true;
                        win();
                    }
                    if (!did_game_end) new_question();
                } else {
                    bar.set(0);
                    end();
                }
            };
        });
    }

    function end() {
        $("#question_text").text("Game over!");
        $("#subtitle").text("Your score was " + score + ".");
        score = 0;
         
        $('.btn').each(function(i, button) {
            button.onclick = function() {
                play();
            };
        });
        $('.button_text').each(function(i, button) {
            $(button).text("");
        });
    }

    function win() {
        $("#question_text").text("You have correctly answered all the questions!");
        $("#subtitle").text("Your score was " + score + ".\nMaybe try another difficulty?");
        score = 0; 

        $('.btn').each(function(i, button) {
            button.onclick = function() {
                play();
            };
        });
        $('.button_text').each(function(i, button) {
            $(button).text("");
        });
    }

    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }   
});