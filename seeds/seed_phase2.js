
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todoitems')
    .del()
    .then(function (){
      return knex('todolists')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('todolists').insert([
          {
            id: 1,
            name: 'morning', 
            uuid: "2015f513-74d4-4ebc-8347-d491befb26cc"
          },
          {
            id: 2,
            name: 'afternoon', 
            uuid: "54c2dda5-81f8-4b4f-bce3-164590a6dbde"
          },
          {
            id: 3,
            name: 'evening', 
            uuid: "99be59eb-bbf9-4122-821e-3ccf04ccb77f"
          },
        ]);
      })
      .then( ()=>seedItems(knex))
    })
  
};

function seedItems(knex){
  return knex('todoitems')
    .then(function (){
      return knex('todoitems').insert([
        {
          id: 1,
          name: 'wash the dog', 
          todolist_id: 1,
          uuid: "56c758a5-9f7e-4c5f-b2c8-a5d86e66af03"
        },
        {
          id: 2,
          name: 'clean the house', 
          todolist_id: 1,
          uuid: "8aae7506-c42a-44ba-840d-d6201fa49a84"
        },
        {
          id: 3,
          name: 'wash the car', 
          todolist_id: 1,
          uuid: "9931cab3-27e5-44ba-a015-68e212826341"
        },
        {
          id: 4,
          name: 'drop the kids off at friends house',
          todolist_id: 1,
          uuid: "bfd011ad-72ce-4d7d-b8f0-ac4c11e04862"
        },
        {
          id: 5,
          name: 'workout', 
          todolist_id: 1,
          uuid: "7d506ffa-730f-4532-a006-83192cc29aca"
        },
        {
          id: 6,
          name: 'pick up kids', 
          todolist_id: 3,
          uuid: "92b0732e-3609-4f8d-be9f-56713a5a1c58"
        },
        {
          id: 7,
          name: 'date night with wife', 
          todolist_id: 3,
          uuid: "08c93817-8404-49fc-ad59-a27de3161211"
        },
      ])
    })
}