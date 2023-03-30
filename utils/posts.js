export const postsArray = [
 {
    id:1,
    file: 'https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location:'Chicago, IL, United States',
    coordinates: {latitude: '41.977226', longitude:'-87.836723' },
    text:'PARK',
    comments:[
        {
            id:1,
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        date: '2022-10-10'
        },
        {  id:2,
            text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
            date: '2022-10-10'
            },
            {
                id:3,
                text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
                date: '2022-10-10'
                },
            
    ],
    likes:0},

{
    id:2,
    file: 'https://images.pexels.com/photos/623279/pexels-photo-623279.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location:'United States',
    coordinates: {latitude: '41.977226', longitude:'-87.836723' },
    text:'CITY VIEW',
    comments:[],
    likes:0},
{
    id:3,
    file: 'https://images.pexels.com/photos/427747/pexels-photo-427747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location:'Shinjuku City, Tōkyō-to, Japan',
    coordinates: {latitude: '35.685272', longitude: '139.709442' },
    text:'JAPAN',
    comments:[],
    likes:0},
]


// SAMPLE POST OBJECT

// {file: '',
// id:"",
// location:'',
// coordinates: {latitude: '', longitude:'' },
// text:'',
// comments:[],
// likes:0}