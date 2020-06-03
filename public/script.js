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
