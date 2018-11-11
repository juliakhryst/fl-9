angular
    .module('app')
    .constant('wallPosts', [
        {
            userId: '1',
            userName: 'Daniel Holloway',
            photo: 'assets/img/avatar1.jpg',
            title: 'Trip to USA',
            message: `We are travelling from New York down to Miami.
            Along the way we will be passing through Philladelphia, Washington, Charleston, 
            St Augustine, Orlando, Sarasota, Roanoak, Savannah and a couple more.
            I would be very gratefull for any recommendations on what to see and do in those places.`,
            likes: 4
        },

        {
            userId: '22',
            userName: 'Anna Peterson',
            photo: 'assets/img/avatar6.jpg',
            title: 'Volonteering in Kenya',
            message: `There is always a high demand for volunteers who want to work with children in Kenya.
            Due to Kenya’s lackluster education system, there is an urgent need for volunteers 
            who can assist teachers in teaching children in public schools, 
            community schools, and orphanages.Since there are many orphanages in Kenya with underprivileged children, 
            there are many opportunities to work with them. 
            Tasks in orphanages include taking care of children, administration, and daily chores.`,
            likes: 7,
            isliked: true
        },

        {
            userId: '333',
            userName: 'James Bradley',
            photo: 'assets/img/avatar3.jpg',
            title: 'Blockchain Summit 2018',
            message: `Blockchain Summit London is the largest blockchain-dedicated event in Europe, 
            bringing together 5,000 industry leaders, business decision makers, 
            tech innovators and investors.Based on unrivalled content and practical ‘how-to’ case studies, 
            over 200 visionary speakers will address the challenges and opportunities of our blockchain future`,
            likes: 3
        }
    ])

