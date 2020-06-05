$(document).ready(function () {
    $(".delete").on('click', function (e) {
        var target = $(e.target)

        const uuid = target.attr('dataListuuid')

        $.ajax({
            type: 'DELETE',
            url: '/list/' + uuid,
            success: function(response){
                alert('Deleting the list.')
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


// $(document).ready(function () {
//     $(".addButton").on('click', function (e) {
//         var name = $(e.target).attr('dataItemName')

//         $.ajax({
//             type: 'POST',
//             url: '/list/:uuid' + name,
//             success: function(response){
//                 alert('You have added a to-do to your list')
//                 location.reload()
//             },
//             error: function(err){
//                 console.log(err)
//             }
//         })
//     })
// })