// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "Test Your Sun Safety  Knowledge!!",
        "main":    "<p>Think you know a lot about UVR and skin cancer? Find out with this super crazy knowledge quiz!</p>",
        "results": "<h5>Learn More</h5><p>Try to learn more from our websites and some linked sites about sun safety in Australia</p>",
        "level1":  "Sun Safety Ready",
        "level2":  "Sun Safety Contender",
        "level3":  "Sun Safety Amateur",
        "level4":  "Sun Safety Newb",
        "level5":  "Stay at home, my friend..." // no comma here
    },
    "questions": [
        { // Question 1 - Multiple Choice, Single True Answer
            "q": "All kinds of sunscreen protects you from sunburn, wrinkles, and age spots.",
            "a": [
                {"option": "True",      "correct": false},
                {"option": "False",     "correct": true}// no comma here
            ],
            "correct": "<p><span>That's right!</span> All sunscreens help prevent sunburn, but only some may help lower the risk of skin cancer.  Only broad-spectrum sunscreens with an SPF of 15 or higher can claim to lower the risk of early skin aging. Broad-spectrum sunscreens protect your skin from both kinds of harmful rays -- ultraviolet A (UVA) and ultraviolet B (UVB).</p>",
            "incorrect": "<p><span>Uhh no.</span> All sunscreens help prevent sunburn, but only some may help lower the risk of skin cancer.  Only broad-spectrum sunscreens with an SPF of 15 or higher can claim to lower the risk of early skin aging. Broad-spectrum sunscreens protect your skin from both kinds of harmful rays -- ultraviolet A (UVA) and ultraviolet B (UVB).</p>" // no comma here
        },
        { // Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "How long will a bottle of sunscreen work?",
            "a": [
                {"option": "A year",    "correct": false},
                {"option": "3 years",   "correct": true},
                {"option": "6 months",    "correct": false} // no comma here
            ],
            "correct": "<p><span>Nice!</span> The FDA requires that sunscreens keep their strength for at least 3 years. But if you're using sunscreen every day and in the right amount, a bottle shouldn't last anywhere near that long. Throw it out if it's past the date on the bottle or if the color or feel of the sunscreen has changed.</p>",
            "incorrect": "<p><span>Hmmm.</span> The FDA requires that sunscreens keep their strength for at least 3 years. But if you're using sunscreen every day and in the right amount, a bottle shouldn't last anywhere near that long. Throw it out if it's past the date on the bottle or if the color or feel of the sunscreen has changed.</p>" // no comma here
        },
        { // Question 3 - Multiple Choice, Multiple True Answers, Select All
            "q": "How much sunscreen should you put on?",
            "a": [
                {"option": "A pea-sized drop",           "correct": false},
                {"option": "A tablespoonful ",                  "correct": false},
                {"option": "Enough to fill a shot glass",  "correct": true} // no comma here
            ],
            "correct": "<p><span>Brilliant!</span> That's about an ounce. Most people skimp. They only apply a quarter to a half of the amount of sunscreen they should. The total you need depends on your body size, but you should coat all exposed skin Use sunscreen every day, even when you won't be outside. Apply it 15 minutes before leaving the house. Re-apply about every 2 hours while in the sun. Do it again after swimming or sweating a lot.</p>",
            "incorrect": "<p><span>Not Quite.</span>That's about an ounce. Most people skimp. They only apply a quarter to a half of the amount of sunscreen they should. The total you need depends on your body size, but you should coat all exposed skin Use sunscreen every day, even when you won't be outside. Apply it 15 minutes before leaving the house. Re-apply about every 2 hours while in the sun. Do it again after swimming or sweating a lot.</p>" // no comma here
        },
        { // Question 4
            "q": "Which should you apply first?",
            "a": [
                {"option": "Moisturizer",    "correct": true},
                {"option": "Makeup",     "correct": false},
                {"option": "Sunscreen",      "correct": false}// no comma here
            ],
            "correct": "<p><span>Holy bananas!</span> After your moisturizer, you should apply sunscreen, then makeup. Some moisturizers and makeup also have SPF sun protection. If you're using bug spray, apply it last. When sunscreen is put on top of bug spray, both are less effective.</p>",
            "incorrect": "<p><span>Fail.</span> After your moisturizer, you should apply sunscreen, then makeup. Some moisturizers and makeup also have SPF sun protection. If you're using bug spray, apply it last. When sunscreen is put on top of bug spray, both are less effective.</p>" // no comma here
        },

        { // Question 5
            "q": "How safe is sunscreen?",
            "a": [
                {"option": "Most expert say it's safe",    "correct": true},
                {"option": "Some ingredients may cause skin cancer",     "correct": false},
                {"option": "Nobody really knows",    "correct": false} // no comma here
            ],
            "correct": "<p><span>Good Job!</span>Nearly all top experts and skin-health groups say sunscreen is safe -- and works! Claims that suggest danger are based on iffy science. A major study tracked more than 1,600 adults over 10 years. Those who wore sunscreen every day cut their risk of melanoma in half.</p>",
            "incorrect": "<p><span>ERRRR!</span> Nearly all top experts and skin-health groups say sunscreen is safe -- and works! Claims that suggest danger are based on iffy science. A major study tracked more than 1,600 adults over 10 years. Those who wore sunscreen every day cut their risk of melanoma in half.</p>" // no comma here
        },
        
        { // Question 6
            "q": "You need sunscreen even on a cloudy day.",
            "a": [
                {"option": "Yes",    "correct": true},
                {"option": "No",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> Overcast skies won't protect your skin from skin cancers or early aging. Up to 80% of the sun's rays pass through fog and clouds. Be extra careful around sand, water, snow, or concrete. These amp up the sun's harmful effects. Wear a hat, along with sunscreen.</p>",
            "incorrect": "<p><span>Uhh no.</span> Overcast skies won't protect your skin from skin cancers or early aging. Up to 80% of the sun's rays pass through fog and clouds. Be extra careful around sand, water, snow, or concrete. These amp up the sun's harmful effects. Wear a hat, along with sunscreen.</p>" // no comma here
        },
        
       { // Question 7
            "q": "An SPF 30 sunscreen protects you better than SPF 15.",
            "a": [
                {"option": "True",    "correct": true},
                {"option": "False",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Holy bananas!</span> Dermatologists recommend using a broad-spectrum sunscreen with at least SPF 30. That should block 97% of UVB rays. But no matter the SPF number, you should reapply every 2 hours to make sure you're protected.</p>",
            "incorrect": "<p><span>ERRRR!</span>Dermatologists recommend using a broad-spectrum sunscreen with at least SPF 30. That should block 97% of UVB rays. But no matter the SPF number, you should reapply every 2 hours to make sure you're protected.</p>" // no comma here
        },                      

        { // Question 8
            "q": "Why are new sunscreen labels better than before?",
            "a": [
                {"option": "They have more info",    "correct": true},
                {"option": "The SPF numbers go much higher",     "correct": false},
                {"option": "the type is bigger",     "correct": false}// no comma here
            ],
            "correct": "<p><span>Nice!</span> In 2013, the FDA began testing all sunscreen products for both UVA and UVB protection. If they pass and have both, they're now called broad spectrum.Only broad-spectrum sunscreens with an SPF of 15 or higher can claim to reduce skin cancer and early aging. Others can only say they help prevent sunburn.The words waterproof, sweatproof, and sunblock are no longer allowed because they're untrue.</p>",
            "incorrect": "<p><span>Not Quite.</span> In 2013, the FDA began testing all sunscreen products for both UVA and UVB protection. If they pass and have both, they're now called broad spectrum.Only broad-spectrum sunscreens with an SPF of 15 or higher can claim to reduce skin cancer and early aging. Others can only say they help prevent sunburn.The words waterproof, sweatproof, and sunblock are no longer allowed because they're untrue.</p>" // no comma here
        } ,

        { // Question 9
            "q": "What's the longest you can stay in the water with water-resistant sunscreen?",
            "a": [
                {"option": "20 minutes",    "correct": false},
                {"option": "80 minutes",     "correct": true},
                {"option": "3 hours",     "correct": false},
                {"option": "All day",     "correct": false}  // no comma here
            ],
            "correct": "<p><span>Good Job!</span> No sunscreen is waterproof. Like all sunscreens, water-resistant products should be reapplied after 2 hours. That's true whether you're in or out of the water. Be sure to reapply after you dry off.</p>",
            "incorrect": "<p><span>Not Quite.</span> No sunscreen is waterproof. Like all sunscreens, water-resistant products should be reapplied after 2 hours. That's true whether you're in or out of the water. Be sure to reapply after you dry off.</p>" // no comma here
        } ,

        { // Question 10
            "q": "Darker-skinned people don't need sunscreen.",
            "a": [
                {"option": "True",    "correct": true},
                {"option": "False",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Brilliant!</span>Everyone needs sunscreen. In all races, basal cell carcinoma -- the most common skin cancer -- is usually due to sun exposure.</p>",
            "incorrect": "<p><span>Hmmm.</span> Everyone needs sunscreen. In all races, basal cell carcinoma -- the most common skin cancer -- is usually due to sun exposure.</p>" // no comma here
        } // no comma here

    ]
};
