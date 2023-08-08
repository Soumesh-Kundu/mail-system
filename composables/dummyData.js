export function useDummyData(){
    const dummyData=[
        {
            id:'IzJLQshQjMQCtqmNCvc_c',
            name:"Neil Sim",
            from:"iamsoumo2asdf@gmail.com",
            to:'test@gmail.com',
            subject:"Am no an listening depending up believing. Enough around remove to estimable be co",
            image:"https://flowbite.com/docs/images/people/profile-picture-1.jpg",
            body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed ipsum et hic facilis. Quasi ipsa possimus at, eligendi illum nostrum fuga accusantium\n\n eum cumque reiciendis odit soluta repellendus doloribus explicabo, accusamus tempore quidem vel quibusdam eveniet ex minima! Eaque quo minus molestias ad vel corporis, mollitia impedit!",
            date:"2023-06-13T01:18:00.000Z",
            replyAndForwards:[]
        },
        {
            id:'bsPcsD7WjhyI8_ITqpQ7Q',
            name:"Handry Murkaie",
            from:"trickmo2asdf@gmail.com",
            to:'test@gmail.com',
            subject:"ex minima! Eaque quo minus molestias ad vel corporis, mollitia impedit!",
            image:"https://flowbite.com/docs/images/people/profile-picture-2.jpg",
            body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n Sed ipsum et hic facilis. Quasi ipsa possimus at, eligendi illum nostrum fuga accusantium eum cumque reiciendis odit soluta repellendus doloribus explicabo, accusamus tempore quidem vel quibusdam eveniet ex minima! Eaque quo minus molestias ad vel corporis, mollitia impedit!",
            date:"2023-06-10T12:18:00.000Z",
            replyAndForwards:[]
        },
        {
            id:'nmofU174fJOozGYcGrUdo',
            name:"Rahul Jaykar",
            from:"iamsoumo2asdf@company.com",
            to:'test@gmail.com',
            subject:"ipsa possimus at, eligendi illum nostrum fuga accusantium eum cum",
            image:"https://flowbite.com/docs/images/people/profile-picture-4.jpg",
            body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed ipsum et hic facilis. Quasi ipsa possimus at, eligendi illum nostrum fuga accusantium eum cumque reiciendis odit soluta repellendus doloribus explicabo, accusamus tempore quidem vel quibusdam eveniet ex minima! Eaque quo minus molestias ad vel corporis, mollitia impedit!",
            date:"2023-06-07T04:55:00.000Z",
            replyAndForwards:[]
        },
        {
            id:'WY5_7xVYUTpKGZKgknHF9',
            name:"Luri Gungelas",
            from:"iaasdfsdff@hotmail.com",
            to:'test@gmail.com',
            subject:"imus at, eligendi illum nostrum fuga accusantium eum cumqu",
            image:"https://flowbite.com/docs/images/people/profile-picture-3.jpg",
            body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed ipsum et hic facilis. Quasi ipsa possimus at, eligendi illum nostrum fuga\n accusantium eum cumque reiciendis odit soluta repellendus doloribus explicabo, accusamus tempore quidem vel quibusdam eveniet ex minima! Eaque quo minus molestias ad vel corporis, mollitia impedit!",
            date:"2023-06-07T15:18:00.000Z",
            replyAndForwards:[]
        },
    ]
    const sentData=[]
    const inboxData=useState('inboxData',()=>[])
    const sentInbox=useState('sentBox',()=>sentData)
    return {inboxData,sentInbox}
}