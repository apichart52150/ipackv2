<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('public/assets/images/newcambridge-logo_bar.png') }}">
    
    <meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="iSAC Speaking" />
	<meta property="og:description" content="คอร์สเรียน IELTS รับรองผล 7.5 สอนสดทุกคลาส โดยเจ้าของภาษา ได้ผลจริง จากสถาบันภาษาคุณภาพ ระดับยอดเยี่ยม 4 ปีซ้อน  เน้นเทคนิคทำข้อสอบ หลักสูตรคุณภาพมาตรฐานสากล" />
	<meta property="og:url" content="https://newcambridgethailand.com/isac_speaking/" />
    <meta property="og:site_name" content="newcambridgethailand.com"/>
	<meta property="og:image:secure" content="{{ asset('public/assets/images/logo_nc.png') }}" />

    <title>@yield('title')</title>

    <!-- App css -->
    <link href="{{ asset('public/assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('public/assets/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('public/assets/css/app.min.css') }}" rel="stylesheet" type="text/css" />

</head>
<body class="authentication-bg">
    <div class="account-pages mt-5 mb-5">

        @yield('content')

    </div>


    <!-- Vendor js -->
    <script src="{{ asset('public/assets/js/vendor.min.js') }}"></script>
    
    <!-- App js -->
    <script src="{{ asset('public/assets/js/app.min.js') }}"></script>

</body>
</html>
