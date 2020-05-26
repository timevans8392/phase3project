$(document).ready(function () {
    $(".delete-button").on('click', function (e) {
        var target = $(e.target)
        
        const uuid = target.attr('dataListuuid')
        
        $.ajax({
            type: 'DELETE',
            url: '/list/' + uuid,
            success: function(response){
                alert('Deleting the list')
                window.location.href='/'
            },
            error: function(err){
                console.log(err)
            }
        })
    })
})

