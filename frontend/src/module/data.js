
export default {
    optionRelation:[
        {
            pk:0,
            main_id:1,
            option_id:2
        },
        {
            pk:1,
            main_id:1,
            option_id:3
        },

    ],
    main: [
        {
            id : 1,
            categoryPk:1,
            name:'경욱샐러드',
            price:4,
            isSoldOut:false,
            descriptionText:"바보",
            image:'asdasd'
            
        },
        {
            id : 2,
            categoryPk:1,
            name:'바보샐러드',
            price:3,
            isSoldOut:false,
            descriptionText:"ㅁ낭만ㅇㅁㄴ",
            image:'asdasd'
            
        },
        {
            id : 3,
            categoryPk:1,
            name:'영택샐러드',
            price:4,
            isSoldOut:false,
            descriptionText:"바보",
            image:'asdasd'
            
        },
        {
            id : 4,
            categoryPk:3,
            name:'콜라',
            price:4,
            isSoldOut:false,
            descriptionText:"바보",
            image:'asdasd'
            
        },
        {
            id : 5,
            categoryPk:3,
            name:'사이다',
            price:4,
            isSoldOut:false,
            descriptionText:"바보",
            image:'asdasd'
            
        },
        {
            id : 6,
            categoryPk:2,
            name:'경욱포케',
            price:4,
            isSoldOut:false,
            descriptionText:"바보",
            image:'asdasd'
            
        },
    ],
        
    option:[
        {
            name:"menu1의option1",
            price:4,
            isSoldOut:false
        },
        {
            name:",enoption2",
            price:4,
            isSoldOut:false
        },
        {
            name:"option3",
            price:4,
            isSoldOut:false
        },
    ],
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

