
export default {
    optionRelation: [
        // 5,6,7 -> 드레싱
        {
            pk: 0,
            main_id: 1,
            option_id: 2
        },
        {
            pk: 1,
            main_id: 1,
            option_id: 3
        },
        {
            pk: 2,
            main_id: 1,
            option_id: 5
        },
        {
            pk: 3,
            main_id: 2,
            option_id: 6
        },
        {
            pk: 4,
            main_id: 2,
            option_id: 7
        },
        {
            pk: 5,
            main_id: 3,
            option_id: 5
        },
        {
            pk: 6,
            main_id: 3,
            option_id: 5
        },
        {
            pk: 7,
            main_id: 4,
            option_id: 6
        },
    ],
    main: [
        {
            id: 1,
            categoryPk: 1,
            name: '경욱샐러드',
            price: 40000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 2,
            categoryPk: 1,
            name: '바보샐러드',
            price: 30000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "ㅁ낭만ㅇㅁㄴ",


        },
        {
            id: 3,
            categoryPk: 1,
            name: '영택샐러드',
            price: 40000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 4,
            categoryPk: 1,
            name: '준하샐러드',
            price: 40000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 5,
            categoryPk: 1,
            name: '주은샐러드',
            price: 40000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 6,
            categoryPk: 1,
            name: '정엽샐러드',
            price: 40000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 7,
            categoryPk: 1,
            name: '주현샐러드',
            price: 40000,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 8,
            categoryPk: 3,
            name: '콜라',
            price: 4,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 9,
            categoryPk: 3,
            name: '사이다',
            price: 4,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 10,
            categoryPk: 2,
            name: '경욱포케',
            price: 4,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
        {
            id: 11,
            categoryPk: 2,
            name: '멋사포케',
            price: 4,
            isSoldOut: false,
            image: 'image',
            descriptionText: "바보",


        },
    ],

    option: [
        {

            id: 1,
            name: "양배추 추가",
            price: 500,
            isSoldOut: false
        },
        {
            id: 2,
            name: "올리브 추가",
            price: 600,
            isSoldOut: false
        },
        {
            id: 3,
            name: "빵 추가",
            price: 700,
            isSoldOut: false
        },
        {
            id: 4,
            name: "연어 추가",
            price: 1000,
            isSoldOut: false
        },
        {
            id: 5,
            name: "오리엔탈 드레싱",
            price: 0,
            isSoldOut: false
        },
        {
            id: 6,
            name: "유자 드레싱",
            price: 0,
            isSoldOut: false
        },
        {
            id: 7,
            name: "발사믹 드레싱",
            price: 0,
            isSoldOut: false
        },
    ],
    categoryPk: [
        {
            id: 1,
            name: '샐러드'
        },
        {
            id: 2,
            name: '포케'
        },
        {
            id: 3,
            name: '음료수'
        },
    ]
    // main:[
    //     {
    //         name:'영택샐러드'
    //     },

    //     {
    //         name:'경욱샐러드'
    //     },
    //     {
    //         name:'정엽샐러드'
    //     }
    // ],
    // option:[
    //     {
    //         dressing:'드레싱1'
    //     },
    //     {
    //         dressing:'드레싱2'
    //     }
    // ],

}

