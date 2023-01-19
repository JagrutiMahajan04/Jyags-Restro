import swal from 'sweetalert';

export  async function loginRequired(){
    await swal({
        title: "Login Required",
        text: "Please login to continue",
        icon: "warning",
        button: true,
        dangerMode:true
    })
    window.location.href = "/login"
}