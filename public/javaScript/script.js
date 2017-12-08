
function showForm(event) {
    $(event.data.arg).show('slow');
};
function hideForm(event) {
    $(event.data.arg).hide('slow');
};
function ajaxReg(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/regist', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            $('#result').html(`Registration Success  <br /> 
                                Welcome <em> MR. ${JSON.parse(xhr.response).surname} <em/> <br/> 
                                Now you can sign in to your account`);
            $("#regForm").hide('slow');
        } else {
            console.log(xhr.status + '-' + xhr.statusText);
        }
    }
}


$('#singUp').on('click', { arg: "#regForm" }, showForm);



$('#send').on('click', function () {
    event.preventDefault();
    if ($('#userName').val() &&
        $('#userSurname').val() &&
        $('#userEmail').val() &&
        $('input[name="gender"]:checked').val() &&
        $('#userPassword').val() &&
        (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test($('#userEmail').val())
    ) {
        if ($('#userPassword').val() === $('#passConfirm').val()) {
            var regData = {
                name: $('#userName').val(),
                surname: $('#userSurname').val(),
                email: $('#userEmail').val(),
                gender: $('input[name="gender"]:checked').val(),
                password: $('#userPassword').val()
            }
            ajaxReg(regData);

            $('#userName').val('');
            $('#userSurname').val('');
            $('#userEmail').val('');
            $('#userPassword').val('');
            $('#passConfirm').val('');

            $('#regErr').text('');
            $('#passConfirm').css("box-shadow", "none");
        } else {
            $('#regErr').text('Password and Confirmation do not match!');
            $('#passConfirm').css("box-shadow", "0px 0px 80px red")
        }
    } else {
        $('#regErr').text('Fill in all the fields and check the password and emaila');
    }
});

$('#singIn').on('click', { arg: "#loginForm" }, showForm);

function ajaxLog(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            var info = JSON.parse(xhr.response);
            if (info.user) {
                $('#result').html(`<span>Success!<span><br />
                                    <span>Your name : ${info.user.name} <span><br />
                                    <span>Your surname : ${info.user.surname} <span><br />
                                    <span>Your gender : ${info.user.gender} <span><br />
                                    <span>Your email : ${info.user.email} <span><br />
                                    <span>Your registration date : ${info.user.cerated} <span><br />`);
                $('#loginEmail').val('');
                $('#loginPassword').val('');
                $('#loginEmail').css("box-shadow", "none");
                $('#loginPassword').css("box-shadow", "none");
                $("#loginForm").hide('slow');
                $("#singUp").hide('slow');
                $("#singIn").hide('slow');
                $("#logOutDiv").show('slow');
                $("#logOutDiv").on('click', function(){
                    location.reload();
                });
            }else if (info.emailErr) {
                $('#logErr').text(`${info.emailErr}`);
                $('#loginEmail').css("box-shadow", "0px 0px 100px red");
            } else if (info.passErr) {
                $('#logErr').text(`${info.passErr}`);
                $('#loginEmail').css("box-shadow", "0px 0px 80px rgb(0, 255, 0)");
                $('#loginPassword').css("box-shadow", "0px 0px 80px red");
            } 
        } else {
            console.log(xhr.status + '-' + xhr.statusText);
        }
    }
}
$('#login').on('click', function () {
    event.preventDefault();
    if ($('#loginEmail').val() &&
        $('#loginPassword').val()
    ) {
        var loginData = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }
        ajaxLog(loginData);
        $('#logErr').text('');
    } else {
        $('#logErr').text('Email or Password entered incorrectly');
    }



});
$('.close>img').on('click', { arg: "#regForm" }, hideForm);
$('.close>img').on('click', { arg: "#loginForm" }, hideForm);

