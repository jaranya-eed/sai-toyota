<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>สายโตโยต้าเอ็มไพร์ส – บริษัทโตโยต้า เอ็มไพร์ส จำกัด. TOYOTA EMPIRES CO.,LTD</title>
        <meta name="description" content="สายโตโยต้าเอ็มไพร์ส" />
        <meta name="keywords" content="สายโตโยต้า, โตโยต้าเอ็มไพร์ส, toyota, empires, taxi, แท็กซี่, โตโยต้า" />
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no">

        <!--<link rel="apple-touch-icon" href="apple-touch-icon.png">-->
        <!-- Place favicon.ico in the root directory -->
<!--        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Italianno" rel="stylesheet">-->
        <link rel="stylesheet" href="styles/styles.min.css" />
    </head>

    <body ontouchstart="">
        <div class="page-loader"></div>

        <!-- Main Banner -->
        <?php
            $main_banner_slider = [
                [
                    "image" => "assets/mock/banner-5.jpg"
                ]
            ];
        ?>
        <section class="banner-section">
            <div class="banner-slide-wrapper">
                <?php
                    foreach ($main_banner_slider as $idx => $img) {
                ?>
                <div class="banner-slide-item">
                    <div class="image-layer" style="background-image: url('<?=$img["image"]?>');"></div>
                    <img class="logo-image" src="assets/sai-logo-png.png" alt="Sai Taxi" />
                    <h1 class="title">TAXI ป้ายแดง โชว์รูมพร้อมขับ</h1>
                </div>
                <?php
                    }
                ?>
            </div>
            <!--<div class="banner-scroll-down-btn">-->
                <!--<label class="text">scroll down</label>-->
                <!--<span class="arrow"></span>
            </div>-->
        </section>

        <!-- Detail Section -->

        <!-- Gallery Section -->
        <?php
        $gallery = [
            [
                "image_url" => "assets/mock/gallery/14.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => ""
            ],
            [
                "image_url" => "assets/mock/gallery/11.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => "block-width-2"
            ],
            [
                "image_url" => "assets/mock/gallery/15.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => ""
            ],
            [
                "image_url" => "assets/mock/gallery/5.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => ""
            ],
            [
                "image_url" => "assets/mock/gallery/12.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => ""
            ],
            [
                "image_url" => "assets/mock/gallery/6.jpg",
                "title" => "",
                "block_width" => "2",
                "block_height" => "",
                "css_class" => "block-width-2"
            ],
            [
                "image_url" => "assets/mock/gallery/8.jpg",
                "title" => "",
                "block_width" => "3",
                "block_height" => "2",
                "css_class" => "block-width-2"
            ],
            [
                "image_url" => "assets/mock/gallery/15.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => ""
            ],
            [
                "image_url" => "assets/mock/gallery/16.jpg",
                "title" => "",
                "block_width" => "",
                "block_height" => "",
                "css_class" => ""
            ]
        ];
        ?>
        <section class="gallery-section">
            <div class="gallery-item-wrapper">
                <?php
                foreach($gallery as $indx => $g_item) {
                    ?>
                    <a rel="main-gallery"
                       href="<?=$g_item["image_url"]?>"
                       class="gallery-item <?=(isset($g_item["css_class"]) ? $g_item["css_class"] : '' ) ?>">
                        <div class="overlay-layer">
                        <span class="preview-icon">
                            <img src="assets/bullet.png" />
                            <!--<i class="fa fa-search-plus"></i>-->
                            <label class="btn-text">enlarge</label>
                        </span>
                        </div>
                        <div class="image-layer" style="background-image: url(<?=$g_item["image_url"]?>);"></div>
                    </a>
                    <?php
                }
                ?>
            </div>
        </section>

        <footer>
            <div class="row">
                <div class="column small-12 large-2 large-offset-1">
                    <img class="logo" src="assets/sai-logo-png.png" alt="Sai Taxi" />
                </div>
                <div class="column small-12 large-6 text-center">
                    <div class="contact-info-block">
                        <span class="info-block">
                            Email: <a href="mailto:saichol.1997@hotmail.com">saichol.1997@hotmail.com</a>
                        </span>
                        <span class="info-block tel-no">
                            โทร: <a href="tel:+66616954922">06-1695-4922</a></label>
                        </span>
                        <span class="info-block">
                            ที่อยู่:  โตโยต้าเอ็มไพร์ส สำนักงานใหญ่ <br />กรุงเทพมหานคร
                        </span>
                        <!--<span class="copyright">
                            Copyright © 2016 Sai Taxis.  All rights reserved.
                        </span>-->
                    </div>
                </div>
                <div class="column small-12 large-2 end">
                    <div class="social-link">
                        <a class="link-item" href="https://www.facebook.com/tunya5000/?hc_ref=ARRXQHAk3LU2R46nOM4UNYESzmUR6bPYAqvdxGsaSmqXf4pKvO7hvhVnlBTkWQ9Zfn4">
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a class="link-item" href="tel:+66616954922">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                        </a>
                        <a class="link-item" href="#">
                            <i class="fa fa-globe" aria-hidden="true"></i>
                        </a>
                        <a class="link-item" href="http://line.me/ti/p/~tunya5000">
                            <img src="assets/img/Android_Icon_512.svg" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </footer>

        <script src="scripts/vendors.min.js"></script>
        <script src="scripts/apps.min.js"></script>
        <script>
            $(function () {
                var bannerImagesList = <?=json_encode($main_banner_slider)?>;
                $('body').imagesLoaded( function() {
                    $(".page-loader").addClass("closing");
                    setTimeout(function () {
                        Main.bannerSlideModule();
                        $(".page-loader").remove();
                    }, 500);
                    Main.init(bannerImagesList);
                });
            });
        </script>
    </body>
</html>