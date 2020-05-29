$(document).ready(function () {
    $(".delete-button").on('click', function (e) {
        var target = $(e.target)
        
        const uuid = target.attr('dataListuuid')
        
        $.ajax({
            type: 'DELETE',
            url: '/list/' + uuid,
            success: function(response){
                alert('You are deleting the list!')
                // window.location.href='/list/newlist'
                location.reload()
                // getTheDeletedList()
            },
            error: function(err){
                console.log(err)
            }
        })
    })
})

// function getTheDeletedList () {
//     app.get('/list/newlist', (req, res) => {
//         // const theName = req.params.name
    
//         db.getLists()
//             .then((theLists) => {
//                 console.log(theLists)
//                 console.log('End of the lists')
//                 res.render('lists', {
//         todolists: theLists
//         })
//     })
//     })
    
// }