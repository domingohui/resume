/*
 * This is a template. 
 * All fields shown are available and optional. Modify or remove them as needed. 
 * The ```data``` object is exported as a global.
 * ```main.js``` uses that to populate components.
 */

let data = {
    header: {
        name: 'Your Name',
        email: 'me@email.com',
        github: 'github',
        phone: ['1', '888', '123', '5678'],
        website: 'https://example.com',
        linkedin: 'linkedin'
    },

    work_experience_items: {
        data: [
            {
                name: 'Company Name',
                role: 'Other info',
                location: 'City',
                link: 'https://company.example.com',
                description: [
                    'Responsibilites',
                    'More info',
                    'Rewrite REST backend',
                ],
                date_from: createYearMonth(2017, 12), // December 2017
                date_to: undefined, // undefined date_to means an ongoing item
                languages: ['C++', 'Python', 'Javascript'],
                tools: ['Numpy', 'React.js', 'Git']
            },
            {
                name: 'Another Company Name',
                role: 'More info',
                location: 'City',
                link: 'https://anothercompany.example.com',
                description: [
                    'Built spaceship to Mars',
                    'Met extraterrestrial species',
                    'Improved translator to communicate with the species'
                ],
                date_from: createYearMonth(2016,11),
                date_to: createYearMonth(2016,11) // Shows up as one date
            },
        ],
        sort_by_key: 'date_from' // You can also sort items by name, for example
    },

    // ditto for projects...
    project_items: {
        data: [
            {
                name: 'Project',
                role: 'Data Science Hackathon',
                github: 'mygithub/project',
                date_from: createYearMonth(2017,5),
                date_to: createYearMonth(2017,5),
                description: [
                    'Top 5 overall',
                ],
                languages: ['Python', 'R', 'Javascript'],
                tools: ['Tensorflow', 'Scikit-learn', 'React.js', 'Redux']
            },

        ],
        sort_by_key: 'name'
    },

    interest: [
        'Life'
    ],

    education_description: [
        'Your school',
        'Online courses'
    ]

};
