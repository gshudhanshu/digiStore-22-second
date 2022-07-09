// // International tel input

// var mobile = document.querySelector('#mobile')
// var errorMobMsg = document.querySelector('#error-mob-msg')
// var validMobMsg = document.querySelector('#valid-mob-msg')
// var errorMobMap = [
//   'Invalid number',
//   'Invalid country code',
//   'Too short',
//   'Too long',
//   'Invalid number',
// ]
// var isMobileValid = false

// var mobile_intTel
// var timerId
// var otpBtn = $('#otpBtn')
// var optInp = $('#otp')
// var timeLeft

// if (mobile) {
//   intTel()
// }

// function intTel() {
//   //Selecting country flag using ip address
//   mobile_intTel = window.intlTelInput(mobile, {
//     // onlyCountries: ['bb'],
//     initialCountry: 'bb',
//     placeholderNumberType: 'MOBILE',
//     hiddenInput: 'full_mobile',
//     onlyCountries: ['bb', 'in'],
//     geoIpLookup: function (callback) {
//       $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (
//         resp
//       ) {
//         var countryCode = resp && resp.country ? resp.country : 'us'
//         callback(countryCode)
//       })
//     },

//     utilsScript: 'assets/js/utils.js', // just for formatting/placeholders etc
//   })
// }

// //Validation of mobile number
// var reset = function () {
//   mobile.classList.remove('error')
//   errorMobMsg.innerHTML = ''
//   errorMobMsg.classList.add('d-none')
//   validMobMsg.classList.add('d-none')
// }

// if (mobile) {
//   // on blur: validate
//   mobile.addEventListener('blur', function () {
//     reset()
//     if (mobile.value.trim()) {
//       if (mobile_intTel.isValidNumber()) {
//         validMobMsg.classList.remove('d-none')
//         isMobileValid = true
//         if (otpBtn.text() === 'Send Code' || otpBtn.text() === 'Resend Code') {
//           otpBtn.prop('disabled', false)
//         }
//       } else {
//         mobile.classList.add('error')
//         var errorCode = mobile_intTel.getValidationError()
//         if ((errorCode = -99)) {
//           errorCode = 0
//         }
//         errorMobMsg.innerHTML =
//           '<i class="fa-solid fa-square-xmark"></i> ' + errorMobMap[errorCode]
//         console.log(errorCode)
//         errorMobMsg.classList.remove('d-none')
//         otpBtn.prop('disabled', true)
//       }
//     }
//   })

//   // on keyup / change flag: reset
//   mobile.addEventListener('change', reset)
//   mobile.addEventListener('keyup', reset)

//   $(document).ready(function () {
//     otpBtn.click(function (event) {
//       let fname = $('#fname').val()
//       let lname = $('#lname').val()
//       let mobile = $('#mobile').val()
//       let full_mobile = mobile_intTel.getNumber(
//         intlTelInputUtils.numberFormat.E164
//       )
//       let password = $('#password').val()
//       let password2 = $('#password2').val()
//       let currentURL = window.location.pathname
//       $.post(
//         '/users/send-otp',
//         {
//           fname: fname,
//           lname: lname,
//           mobile: mobile,
//           full_mobile: full_mobile,
//           password: password,
//           password2: password2,
//           currentURL: currentURL,
//         },
//         (res) => {
//           $('.alerts').html(res)
//           if (res.opt === 'sent') {
//             timeLeft = 30
//             otpBtn.prop('disabled', true)
//             timerId = setInterval(countdown, 1000)
//             optInp.prop('disabled', false)
//           }
//         }
//       )
//     })
//   })

//   function countdown() {
//     if (timeLeft === -1) {
//       clearTimeout(timerId)
//       otpBtn.prop('disabled', false)
//       otpBtn.html('Resend Code')
//     } else {
//       otpBtn.prop('disabled', true)
//       otpBtn.html(timeLeft + ' sec')
//       timeLeft--
//     }
//   }
// }

// if (window.history.replaceState) {
//   window.history.replaceState(null, null, window.location.href)
// }
