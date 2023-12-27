// kalam api list
const url = "https://softwarezsolution.com/app/kalam_E_Learning/kalam_api/App_Api.php";
const otpApi = "https://kalamacademy.org/learn/api.php";
const instamojoApi = 'https://softwarezsolution.com/app/kalam_E_Learning/kalam_api/respay.php';
// kalam api list

const checkApi = 'https://softwarezsolution.com/app/kalam_E_Learning/';

// test api list
// const testPayment = "https://kalam.sysrootsolution.com/instamojo/pay.php";
// const checkApi = 'http://localhost/lms/';
// test api list

const appAPI = checkApi+"kalam_api/App_Api.php";
const imgAPI = checkApi+"admin panel/api/uploads/company_logo/";

const user_id = localStorage.getItem("user_id");
const user_name = localStorage.getItem("user_name");
const mobile = localStorage.getItem("mobile");

function login() {
    subscribe();
    let mobile = $("#mobile").val();
    if (mobile == '') {
        $("#error").html('Please Enter Mobile Number');
    } else if (mobile.length != 10) {
        $("#error").html('Please Enter Valid Mobile Number');
    } else {
        $.ajax({
            url: url,
            method: 'POST',
            data: { mobile: mobile, type: '1' },
            beforeSend: function () {
                $('.loader').show(); $("#login-btn").attr("disabled", true);
            },
            success: function (response) {
                $('.loader').show(); $("#login-btn").attr("disabled", false);
                if (response.status == 1) {
                    $('.loader').hide();
                    localStorage.setItem("mobile", mobile);
                    localStorage.setItem("user_id", response.user_id);
                    localStorage.setItem("user_name", response.user_name);
                    localStorage.setItem("user_email", response.email);
                    location.href = 'otp.html';
                }

                else {
                    $('.loader').hide();
                    $("#error").html('Not Registered.... Please SignUp First ');

                }
            }
        });
    }

}


function signup() {

    let fname = $("#fname").val();
    let mobile = $("#mobile").val();
    let email = $("#email").val();
    let pincode = $("#pincode").val();

    if (fname == '' || mobile == '' || email == '' || pincode == '') {
        $("#error").html(" Enter Full Details !! ");
    } else if (mobile.length != 10) {
        $("#error").html(" Enter Valid Phone Number !! ");
    } else {
        $.ajax({
            url: url,
            method: 'POST',
            data: { fname: fname, mobile: mobile, email: email, pincode: pincode, type: '2' },
            beforeSend: function () {
                $('.loader').show(); $("#signup-btn").attr("disabled", true);
            },
            success: function (response) {
                $("#signup-btn").attr("disabled", false);
                if (response.status == 1) {
                    $('.loader').hide();
                    localStorage.setItem("mobile", mobile);
                    localStorage.setItem("user_id", response.user_id);
                    localStorage.setItem("user_name", response.user_name);
                    localStorage.setItem("user_email", email);
                    location.href = "otp.html";
                }
                else {
                    $('.loader').hide();
                    location.href = "login.html";
                    $("#error").html(" ERROR Please Try Again !! ")
                }
            }
        });
    }
}

function resendOtp() {
    start();
    otp2();
}

function otp2() {
    var mobile = localStorage.getItem("mobile");
    var otp = localStorage.getItem("otp");
    $.ajax({
        url: otpApi,
        method: 'POST',
        data: {
            mno: mobile,
            otp: otp
        },
        success: function (response) {
            if (response) {
                $('.loader').hide();
                localStorage.setItem("otp", otp);
            }
            else {
                $('.loader').hide();
                location.href = "login.html";
                $("#error").html(" ERROR Please Try Again !! ")
            }
        }
    });
}

function otp() {
    $('.loader').show();
    var mobile = localStorage.getItem("mobile");
    var email = localStorage.getItem("user_email");
    var user_name = localStorage.getItem("user_name");
    var otp = Math.floor(1000 + Math.random() * 9000);
    $('#phone').html(mobile + '&nbsp;&nbsp;<i class="fas fa-pencil"></i>');
    $('#email').html(email + '&nbsp;&nbsp;<i class="fas fa-pencil"></i>');
    $.ajax({
        url: otpApi,
        method: 'POST',
        data: {
            mno: mobile,
            otp: otp,
        
        },
        success: function (response) {
            if (response) {
                $('.loader').hide();
                localStorage.setItem("otp", otp);
            }
            else {
                $('.loader').hide();
                location.href = "login.html";
                $("#error").html(" ERROR Please Try Again !! ");
            }
        }
    });
    
    $.ajax({
        url: "https://kalamacademy.org/learn/otpmail.php",
        method: 'POST',
        data: {
            email: email,
            otp: otp,
            user_name:user_name
        },
        success: function (response) {
            if (response) {
                $('.loader').hide();
                localStorage.setItem("otp", otp);
            }
            else {
                $('.loader').hide();
                location.href = "login.html";
                $("#error").html(" ERROR Please Try Again !! ");
            }
        }
    });

}

function checkotp() {
    var send_otp = localStorage.getItem("otp");
    var otp1 = $("#otp1").val();
    var otp2 = $("#otp2").val();
    var otp3 = $("#otp3").val();
    var otp4 = $("#otp4").val();
    var otp = otp1 + otp2 + otp3 + otp4;
    if (send_otp == otp) {
        localStorage.setItem("login_status", "TRUE");
        multipleDeviceLoginRegister();
        
    }
    else {
        $("#otp_msg").css("display", "block");
        
    }
}

function logout() {

    localStorage.clear();
    location.href = "index.html";
}


// start from here ash

// version check

function versionCheck() {

    let versionNumber = '3.0.0';

    $.ajax({
        url: url,
        method: 'POST',
        data: { "type": 11 },
        success: function (res) {

            if (versionNumber == res[0].Value) {
                loginCheck();
            } else {
                if (res[0].Extra == 'critical') {
                    location.href = "appUpdate.html";
                } else {
                    localStorage.setItem("update_msg", "1");
                    loginCheck();
                }
            }
        }
    });

}

// login check

function loginCheck() {

    let login_status = localStorage.getItem("login_status");
    if (login_status == "TRUE") {
        location.href = "course.html";
    } else {
        location.href = "login.html";
    }

}

function loginCheckLoginPage() {

    let login_status = localStorage.getItem("login_status");
    if (login_status == "TRUE") {
        location.href = "course.html";
    }
}

// background worker

function backgroundWorker() {

    var lecture;
    var topics;
    var course;

    $.when(
        $.ajax({
            url: url,
            type: "POST",
            data: { type: 4 },
            async: false,
            cache: false,
            success: function (res) {
                lecture = res;
            }
        }),

        $.ajax({
            url: url,
            type: "POST",
            data: { type: 12 },
            async: false,
            cache: false,
            success: function (res) {
                topics = res;
            }
        }),

        $.ajax({
            url: url,
            type: "POST",
            data: { type: 10 },
            async: false,
            cache: false,
            success: function (res) {
                course = res;
            }
        })

    ).then(function () {
        localStorage.setItem("lecture", JSON.stringify(lecture));
        localStorage.setItem("topics", JSON.stringify(topics));
        localStorage.setItem("course", JSON.stringify(course));
        versionCheck();
    });

}

function loadCourse() {

    let lecture = JSON.parse(localStorage.getItem("lecture"));
    let topics = JSON.parse(localStorage.getItem("topics"));
    let course = JSON.parse(localStorage.getItem("course"));

    // course load

    let c_id = localStorage.getItem('c_id');

    course = course.find(item => item.C_ID == c_id);

    $("#headtxt1").html(course.C_Name);

    emb_url = course.C_Url.replace("watch?v=", "embed/");
    $("#lounchvideo").html(`
        <div class="aiframe"> 
            <iframe class="riframe" src="${emb_url}?autoplay=1&mute=1"></iframe>
        </div>
    `);

    // load topic

    topics = topics.filter(item => item.C_ID == c_id);

    // load sub-topic

    let accordian_data = '';

    topics.forEach(item => {

        accordian_data += `<li class="accordion-item">
            <div class="accordion-thumb">
                <div class="accordion-thumb-child1" onclick="listOpenClose(this)">
                    <i class="fa-solid fa-circle-play accordion-thumb-icon"></i>
                    <div class="accordion-thumb-child2">
                        <p class="accordion-thumb-header">${item.CT_Title}</p>
                        <p class="accordion-thumb-time">${item.CT_duration}</p>
                    </div>
                </div>
            </div>
            <div class="accordion-panel">`;

        lecture.forEach(sl => {
            if (sl.CT_ID == item.CT_ID) {
                let open = sl.Preview === "0" ? "" : "-open"
                let desc = encodeURI(sl.CL_Descprition);
                accordian_data += `
                    <div
                        onclick="lecPlay('${sl.CL_Content}','${sl.Preview}','${desc}','${sl.constURL}','${sl.CL_Title}' , '${item.CT_Title}')" class="subtopic">
                        <p class="cl_title_in_div">${sl.CL_Title}</p>
                        <i class="fa-solid fa-lock${open}"></i>
                    </div>
                `;
            }

        });

        accordian_data += `
                        </div>          
                    </li>
        `;

    });

    $("#res-data").append(accordian_data);

}

// code for accordian { course list }

const listOpenClose = (e) => {
    const list = e.parentNode.parentNode;
    $(list)
        .siblings(".accordion-item")
        .removeClass("is-active")
        .children(".accordion-panel")
        .slideUp();
    $(list)
        .toggleClass("is-active")
        .children(".accordion-panel")
        .slideToggle("ease-out");
}




function loadcourseoncourse() {

    let course = JSON.parse(localStorage.getItem("course"));

    let html = '';
    course.forEach(item => {
        html += `
            <div class="col-12 text-light rounded-5 maincard cardmain" onclick='gotoLecture(${JSON.stringify(item)})'>    
                <div class="row">
                    <img src="assets/images/digital-marketing.png" class="img-fluid imgsize" >
                </div>
                <div class="mt-3  maincardbottom">
                    <p> ${item.C_Name} </p>
                    <i class="fa-solid fa-circle-arrow-right isize"></i>
                </div> 
            </div>
            `;
    });

    $('#courses').html(html);
}

// ash code end here


function lecPlay(a, b, c, d, CL_Title, CT_Title) {

    $('.loader').show();

    var c = decodeURI(c);
    var sale_pr = localStorage.getItem('c_spr');
    var Course_id = localStorage.getItem('c_id');
    var c_title = localStorage.getItem('c_title');

    $("#CL_Title").html(CL_Title);
    $("#headtxt1").html(c_title);
    $("#headtxt2").html(CT_Title);

    if (b === "0") {
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                type: 5,
                user_id: user_id,
                c_id: Course_id
            },
            success: function (res) {
                if (res === "No") {
                    function sendDetails() {
                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: {
                                type: 8,
                                cs_id: user_id,
                                c_id: Course_id
                            },
                            success: function (r) { }
                        });

                        let email = localStorage.getItem("user_email");

                        $.ajax({
                            url: instamojoApi,
                            method: 'POST',
                            data: {
                                name: user_name,
                                email: email,
                                phone: mobile,
                                amount: sale_pr,
                                purpose: c_title,
                            },
                            success: function (url) {
                                cordova.InAppBrowser.open(url, '_system', 'hidden=yes,location=no');
                                
                            }
                        });
                    }
                    sendDetails();

                    function getstatus() {
                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: {
                                type: 9,
                                cs_id: user_id,
                                c_id: Course_id
                            },
                            success: function (response) {
                                if (response === "Yes") {
                                    $.ajax({
                                        url: url,
                                        method: 'POST',
                                        data: {
                                            type: 6,
                                            user_id: user_id,
                                            c_id: Course_id,
                                            fee: sale_pr,
                                            paid_via: "instamojo",
                                            phone: mobile

                                        },
                                        success: function (data) {
                                            $('.loader').hide();
                                            clearInterval(sts);
                                            location.reload();
                                        }
                                    });
                                }

                            }
                        });
                    }

                    var sts = setInterval(getstatus, 5000);

                } else {
                    playVideo(a, d);
                    $('.loader').hide();

                }

            }

        });
    } else {
        playVideo(a, d);
        $('.loader').hide();
    }
    $(window).scrollTop(0);
    $('#lecturediscription').html(`<p>${c}</p>`);
    $('#lecturediscription').hide();
}

function loadalltopic() {

    $(".more").addClass("line");
    $(".lecture").removeClass("line");
    $("#lecturediscription").css("display", "block");

}

function lecturebtn() {

    $(".more").removeClass("line");
    $(".lecture").addClass("line");
    
    $("#lecturediscription").css("display", "none");
    
}

function call(x) {
    location.href = `tel:${x}`;
}

function gotoLecture(i) {
    localStorage.setItem('c_id', i.C_ID);
    localStorage.setItem('c_spr', i.Sale_Price);
    localStorage.setItem('c_url', i.C_Url);
    localStorage.setItem('c_title', i.C_Name);
    location.href = 'lecture.html';
}

function loadLiveSeesion() {
    $.ajax({
        url: url,
        method: 'POST',
        data: {
            type: 7
        },
        success: function (response) {
            if (response != "null") {
                let currDate = new Date(response[0].DOR);
                let strDate = currDate.toString();
                let index = strDate.indexOf("GMT");
                $('#LiveDate').html(strDate.slice(0, index - 1));
                $('#LiveTitle').html(response[0].Title);

                $('#liveDiv').wrap(`<k onclick="GoLive('${response[0].Live_Link}')"></k>`);
            } else {
                $('#LiveTitle').html("No Any Live ");
                $('#LiveDate').hide();
            }
        }
    });
}

function GoLive(link) {
    var link = link.replace("watch?v=", "embed/");
    $('.more-l').html('Playing...');
    $('.maincard1').parent().html(`<div class="aiframe"><iframe class="riframe" src="${link}" allowfullscreen ></iframe></div>`);
    
}

function playVideo(link, pylink) {
    $('.loader').show();
    function getUrl(youTubeurl, consturl) {

        const api = consturl;
        let url = api + youTubeurl;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let x = data;
                console.log(x.adaptiveFormats[0].url);
                if (x.adaptiveFormats[0].url.startsWith("https://") == true) {
                    $("#lounchvideo").html(`
                        <video width="320" height="240" controls controlsList="nodownload">
                            <source src="${x.formats[1].url}" type="video/mp4">
                        </video>
                    `);
                } else {
                    var url = youTubeurl.replace("watch?v=", "embed/");
                    $("#lounchvideo").html(`
                        <div class="aiframe"> 
                            <iframe class="riframe" src="${url}"></iframe>
                        </div>
                    `);
                }
               
            });

    }

    getUrl(link, pylink);
    $('.loader').hide();

}


// timer function

function start() {
    var fiveMinutes = 30 * 1,
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let start = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Resend sms in " + seconds + " sec";

        if (--timer < 0) {
            console.log(timer);
            clearInterval(start);
            // timer = duration;
            hello();
        }
    }, 1000);
}

function hello() {
    document.getElementById("time").innerHTML = "Resend";
    // alert();
}

$("#mobile").on("keyup", function () {
    console.log(this.value.length);
    if (this.value.length >= 10) {
        let z = $("#mobile").val();
        z = z.slice(0, 10);
        $("#mobile").val(z);
    }
});

function goBack() {
    history.back();
}

function gotoYoutube() {
    cordova.InAppBrowser.open("https://www.youtube.com/@KalamAcademyranchi", '_system', 'hidden=yes,location=no');
}

function gotowebsite() {
    cordova.InAppBrowser.open("https://www.kalamacademy.org", '_system', 'hidden=yes,location=no');
}

// phase 2

// job list template

function loadJobListTemplate( data , pay_status ) {

    let blur_class = pay_status ? ' job-line-blur' : '';
    let img_blur = pay_status ? 'job-card-img-blur' : '';
    let on_click = pay_status ? 'onclick="checkPayment()"' : '';

    return `
        <div class="job-card" ${on_click}>
            <div class="job-card-inner">
              <div class="job-card-div">
                <img 
                  class="job-card-img ${img_blur}" 
                  src="
                  ${imgAPI + data.Company_logo}
                    " alt="logo">
              </div>
              <p class="job-card-title">
                ${data.Job_title}
              </p>
              <p class="job-card-com-name ${blur_class}">
                ${data.Company_name}
              </p>
              <p class="job-card-description">
                ${data.Job_description}
              </p>
              <p class="job-card-number-address">
                <span class="job-card-number">
                  <i class="fa-solid fa-phone"></i> 
                  <span class="${blur_class}">
                    ${data.Mobile}
                  </span> 
                </span>
                <span class="job-card-address">
                  <i class="fa-solid fa-location-dot"></i> 
                  <span class=" ${blur_class}">
                  ${data.Address}
                  </span>
                </span>
              </p>
              <p class="job-card-end">
                <span class="job-card-type">
                  ${data.Type_of_job}
                </span>
                <span class="job-card-salary">
                  ${data.Salary_range}
                </span>
                <span class="job-card-openings">
                  <i class="fa-solid fa-users"></i>
                  <span>
                    ${data.No_of_opening}  
                  </span>
                </span>
                <span class="job-card-category">
                  ${data.Course_name}
                </span>
              </p>
            </div>
          </div>
      `;

}


// load all job list

async function loadJobList() {

    $('.loader').show();

    const user_id = localStorage.getItem("user_id");

    const formData1 = new FormData();

    formData1.append( "type", "21" );

    formData1.append( "user_id" , user_id );

    let req1 = await fetch(appAPI, { method: "POST", body: formData1 });

    let status = await req1.json();

    status = status.status ;
    
    const formData = new FormData();

    formData.append("type", "13" );

    let req = await fetch(appAPI, { method: "POST", body: formData });

    const data = await req.json();

    data.forEach(item => {
        $("#res_all").append(loadJobListTemplate(item , status));
    });

    const dm_data = data.filter(item => item.Course_name == 'DM');

    dm_data.forEach(item => {
        $("#res_dm").append(loadJobListTemplate(item , status));
    });

    const wdc_data = data.filter(item => item.Course_name == 'WDC');

    wdc_data.forEach(item => {
        $("#res_wdc").append(loadJobListTemplate(item , status));
    });

    $('.loader').hide();

}

// make usnique id

function makeuniqueid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

// load wallet

async function loadWallet() {

    const user_id = localStorage.getItem("user_id");

    const referid = makeuniqueid(4);

    const formData = new FormData();

    formData.append("type", 14 );

    formData.append("referid", referid);

    formData.append("user_id", user_id);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    const data = await req.json();

    console.log(data)

    $("#amount_print").html(`
        &#8377;&nbsp;
        ${data.Amount_earned}`
    );
    $("#amount_input").val(data.Amount_earned);
    $("#my_ref_code").html(`
       Refral code - ${data.Referid}
    `);
    localStorage.setItem("my_refCode" , data.Referid);

}

// withdrawal form

$("#withdrawal-form-submit").submit(function (e) {

    e.preventDefault();

    // amount check condition

    let prev_balance = $("#amount_input").val();
    let reqs_balance = $("#amount").val();

    let diff = prev_balance - reqs_balance ;

    if( diff < 0 ) {
        
        $("#wid_msg").html(`
            <div class="alert alert-danger">
                AMOUNT MUST BE LESS THAN ${prev_balance} !
            </div>
        `);
        return null;
    }

    $("#wid_msg").html('');

    // UPI check condition

    let upi = $("#upi").val();

    if( ! upi.includes("@") ) {

        $("#wid_msg").html(`
            <div class="alert alert-danger">
                CHECK UPI !!! !
            </div>
        `);
        
        return null ;
    }

    $("#wid_msg").html('');


    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const user_id = localStorage.getItem("user_id");

    let formData = new FormData(this);

    formData.append("type", 15 );

    formData.append("user_id", user_id);

    formData.append("req_date", currentDate);

    $.ajax({
        url: appAPI,
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.st == 1) {
                $("#wid_msg").html(`
                <div class="alert alert-success">
                    Done !!!
                </div>
            `);
            } else {
                $("#wid_msg").html(`
                <div class="alert alert-warning">
                    Error... Try again !!!
                </div>
            `);
            }
            $("#amount").val('');
            $("#upi").val('');
        }
    });

});


// refral check

$("#referals-form-submit").submit(function (e) {

    e.preventDefault();

    const user_id = localStorage.getItem("user_id");

    let formData = new FormData(this);

    formData.append("type", 16 );

    formData.append("user_id", user_id);

    $.ajax({
        url: appAPI,
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            $("#ref_msg").html(`
                <div class="alert alert-warning">
                    ${ data.msg }
                </div>
            `);
            $("#ref_cd").val('');
        }
    });

});

// ren template

function loadRENTemplate(name,status) {

    let icon;
    if( status == 1 ) {
        status = 'Referral not done ' ;
        icon = '<i class="fa-solid fa-circle-xmark iconA redA"></i>' ;
    } else if ( status == 2 ) {
        status = 'Referral done ' ;
        icon = '<i class="fa-solid fa-circle-check iconA greenA"></i>' ;
    } else {
        status = 'Error in fetching details' ;
    }

    return `
        <div class="ref-li">
          <div class="ref-body">
            <div class="inside-ref-body">
             <p class="ref-p1"> ${name} </p>  
             <p class="ref-p2"> 
                ${status}
             </p>
             ${icon}
            </div>
          </div>
        </div>
    `;

}

// load my refral

async function loadRENList() {

    const formData = new FormData();

    const user_id = localStorage.getItem("user_id");

    formData.append("user_id", user_id);

    formData.append("type", 17 );

    let req = await fetch(appAPI, { method: "POST", body: formData });

    const data = await req.json();

    data.forEach(item => {
        $("#res_my_ref").append(loadRENTemplate( item.CS_Name , item.status ));
    });

}


// txn template

function loadTxnTemplate(data) {

    let icon;
    if ( data.Status == 0 ) {
        Status = 'REQUEST PENDING' ;
        icon = '<i class="fa-solid fa-circle-question iconA orangeA"></i>' ;
    } else if ( data.Status == 1 ) {
        Status = 'DONE SUCCESSFULLY' ;
        icon = '<i class="fa-solid fa-circle-check iconA greenA"></i>' ;
    } else if ( data.Status == 2 ) {
        Status = 'CANCEL BY ACADEMY' ;
        icon = '<i class="fa-solid fa-circle-xmark iconA redA"></i>' ;
    } else {
        Status = '' ;
    }
    return `
        <div class="txn-li">
          <div class="txn-body">
            <div class="inside-txn-body">
                <p>Rs. : ${data.Amount}&nbsp;&#8377;</p>
                <p>UPI : ${data.UPI_ID}</p>
                <p>Status : ${Status}</p>
                ${icon}
            </div>
          </div>
        </div>
      `;

}

// load my refral

async function loadTxnList() {

    const formData = new FormData();

    const user_id = localStorage.getItem("user_id");

    formData.append("user_id", user_id);

    formData.append("type", 18 );

    let req = await fetch(appAPI, { method: "POST", body: formData });

    const data = await req.json();

    data.forEach(item => {
        $("#res_my_txn").append(loadTxnTemplate(item));
    });

}

// multiple device login check

async function multipleDeviceLoginRegister() {

    const formData = new FormData();

    const user_id = localStorage.getItem("user_id");

    formData.append("user_id", user_id);

    const Code = makeuniqueid(10);

    formData.append("Code", Code);

    formData.append("type", 19 );

    let req = await fetch(appAPI, { method: "POST", body: formData });

    const data = await req.json();

    if( data.msg == 1 ) {
        localStorage.setItem("deviceId",Code);
        location.href = 'course.html';
    }

}

async function multipleDeviceLoginCheck() {

    const formData = new FormData();

    const user_id = localStorage.getItem("user_id");

    const Code = localStorage.getItem("deviceId");

    formData.append("user_id", user_id);

    formData.append("Code", Code);    

    formData.append("type", 20 );

    let req = await fetch(appAPI, { method: "POST", body: formData });

    const data = await req.json();

    if( data.msg == 0 ) {
        alert('not logged in');
        logout();
    }
    if( data.msg == 1 ) {
        alert( 'you are logout from previous device ' );
    }

}

// refer earn share

function shareMe() {
    var my_refCode = localStorage.getItem('my_refCode');
    window.plugins.socialsharing.share('Download Kalam Academy Ranchi use my code '+my_refCode+ 'and get reward', null, null, 'https://play.google.com/store/apps/details?id=com.kalamacademyranchi.kalamacademyranchi')  ;
}

// back button
document.getElementById("go-back").addEventListener("click", () => {
    history.back();
});

// check payment for job show

function checkPayment() {

    var Course_id = localStorage.getItem('c_id');
    var user_id = localStorage.getItem('user_id');
    var sale_pr = JSON.parse(localStorage.getItem('course'))[0].Sale_Price ;
    var c_title = JSON.parse(localStorage.getItem('course'))[0].C_Name ;
    var user_name = localStorage.getItem('user_name');
    var mobile = localStorage.getItem('mobile');

    // console.log( sale_pr ) ;

    if ( Course_id === "1" ) {
        $('.loader').show();
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                type: 5,
                user_id: user_id,
                c_id: Course_id
            },
            success: function (res) {
                console.log(res);
                if (res === "No") {
                    function sendDetails() {
                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: {
                                type: 8,
                                cs_id: user_id,
                                c_id: Course_id
                            },
                            success: function (r) { }
                        });

                        let email = localStorage.getItem("user_email");

                        $.ajax({
                            url: instamojoApi,
                            method: 'POST',
                            data: {
                                name: user_name,
                                email: email,
                                phone: mobile,
                                amount: sale_pr,
                                purpose: c_title,
                            },
                            success: function (url) {
                                
                                cordova.InAppBrowser.open(url, '_system', 'hidden=yes,location=no');
                                
                            }
                        });
                    }
                    sendDetails();

                    function getstatus() {
                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: {
                                type: 9,
                                cs_id: user_id,
                                c_id: Course_id
                            },
                            success: function (response) {
                                if (response === "Yes") {
                                    $.ajax({
                                        url: url,
                                        method: 'POST',
                                        data: {
                                            type: 6,
                                            user_id: user_id,
                                            c_id: Course_id,
                                            fee: sale_pr,
                                            paid_via: "instamojo",
                                            phone: mobile

                                        },
                                        success: function (data) {
                                            $('.loader').hide();
                                            clearInterval(sts);
                                            location.reload();
                                        }
                                    });
                                }

                            }
                        });
                    }

                    var sts = setInterval(getstatus, 5000);

                } else {
                    $('.loader').hide();
                }

            }

        });
    } else {
        $('.loader').hide();
    }

}

// load banner

function loadbanner () {
    $("#rebanner").html(`<img src="${checkApi+"admin panel/api/uploads/banner/refer.png"}" alt="banner" class="referimg"></img>`);
}