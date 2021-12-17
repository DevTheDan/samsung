// parallax анимация на главной

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);
 
 // фикс хедер

var header__wrapper = $('.header__wrapper');
$(window).on('scroll', function() {

    if ($(window).scrollTop() > 180) {
        header__wrapper.addClass('fixed');
    } else {
        header__wrapper.removeClass('fixed');
    }		

});	

  // слайдер

$(document).ready(function(){
  var time = 2;
  var $slick, isPause, tick, percentTime = 0;

  $slick = $('.slider');
  $slick.slick({
    arrows:false,
    prevArrow: $('.arrowsWrapperLeft'),
    nextArrow: $('.arrowsWrapperRight'),
    appendArrows: $(this).parents('.slider').find('.arrowsWrapper'),
    dots: false,
    autoplaySpeed: 4000,
    pauseOnFocus: false,
    pauseOnHover: false,
    draggable: true
  });
  $slick.on({
    mouseenter: function() {
      isPause = true;
    },
    mouseleave: function() {
      isPause = false;
      startProgressbar();
    },
    mousedown: function() {
      $rbar.fadeOut('slow');
      percentTime = 0;
    }
  });

  function startProgressbar() {
    clearTimeout(tick);
    isPause = false;
    tick = setInterval(interval, 20);
    $rbar.fadeIn('slow');
  }
  var $rbar = $('.circle-go');
  var rlen = 2 * Math.PI * $rbar.attr('r');

  function interval() {
    if (isPause === false) {
      percentTime += 1 / (time + 0.1);
      $rbar.css({
        strokeDasharray: rlen,
        strokeDashoffset: rlen * (1 - percentTime / 100)
      });
      if (percentTime >= 100) {
        $slick.slick('slickNext');
        percentTime = 0;
        startProgressbar();
      }
    }
  }
  startProgressbar();


  // стрелки

  $('.arrowRight').on('click', function() {
    $('.slider').slick('slickNext');
  });

  $('.arrowLeft').on('click', function() {
    $('.slider').slick('slickPrev');
  });


  // табы 

  $('.prices__tabs').on('click', 'li:not(.prices__tabs_active)', function() {
      $(this)
        .addClass('prices__tab_active').siblings().removeClass('prices__tab_active')
        .closest('div.container').find('div.tabs__content').removeClass('tabs__content_active').eq($(this).index()).addClass('tabs__content_active');
  });

  // переключение по стрелкам

  $('#tabRight').on('click', function() {
    if ($('li.prices__tab_active').index() == -1) {
      $('.prices__tabs:first-child'.addClass('prices__tab_active'));
    } else {
      $('li.prices__tab_active').next('li').addClass('prices__tab_active').click();
      $('li.prices__tab_active').prev('li').removeClass('prices__tab_active');
    }
  });

  $('#tabLeft').on('click', function() {
    if ($('li.prices__tab_active').index() == -1) {

    } else {
      $('li.prices__tab_active').prev('li').addClass('prices__tab_active').click();
      $('li.prices__tab_active').next('li').removeClass('prices__tab_active');
    }
  });




  // показать больше1

  $('#showMore1').on('click', function() {
    $('#p1_1').toggleClass('opacity0');
    $('#p1_2').toggleClass('opacity0');
    $('#showMore1').toggleClass('imgReverse');
    $('.awimore').toggleClass('mbmore');
  });

  // показать больше2

  $('#showMore2').on('click', function() {
    $('#p2_1').toggleClass('opacity0');
    $('#p2_2').toggleClass('opacity0');
    $('#showMore2').toggleClass('imgReverse');
    $('.tabRow2').toggleClass('customHidden');
    $('.divider2').toggleClass('customHidden');
  });

  $('.prices__tab').on('click', function() {
    if ($('.tabs__content').hasClass('tabs__content_active')) {
      $('.tabs__content').removeClass('tabs__content_active');
      $('.p2').addClass('opacity0');
      $('.p1').removeClass('opacity0');
      $('.tabRow2').addClass('customHidden');
      $('.divider2').addClass('customHidden');
      $('.showMore').removeClass('imgReverse');
    }
  });

  // menu

  $('#burger').on('click', function() {
    $('.overlay, #menu').fadeIn();
    $('body').css('overflow', 'hidden');
  });

  $('.menu__close').on('click', function() {
    $('.overlay, #menu').fadeOut();
    $('body').css('overflow', '');
  });

  $('.menu__nav_link').on('click', function() {
    $('.overlay, #menu').fadeOut();
    $('body').css('overflow', '');
  });  

  // модальные окна 

  $('.demolink').on('click', function() {
    $('#demo, .overlay').fadeIn();
    $('#thanks, #description,  #order, #menu').fadeOut();
    $('body').css('overflow', '');
  });

  $('#mini').on('click', function() {
    $('#thanks, #description,  #order, .overlay, #demo').fadeOut();
    $('body').css('overflow', '');
  });

  $('.detail').on('click', function() {
    $('#description, .overlay').fadeIn();
    $('body').css('overflow', 'hidden');
  });

  $('.data').on('click', function() {
    $('#order, .overlay').fadeIn();
    $('#description').fadeOut();
    $('body').css('overflow', 'hidden');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #description, #order, #demo').fadeOut();
    $('body').css('overflow', '');
  });

  // подробнее + замена текста

  $('.detail').each(function(i) {
    $(this).on('click', function() {
      $('#description .modal__subtitle').text($('.rowTitle').eq(i).text());
      $('#description .cost p').text($('.costMod').eq(i).text());
      $('#description .time p').text($('.timeMod').eq(i).text());
      $('#description, .overlay').fadeIn();
      $('body').css('overflow', 'hidden');
    });
  });


  $(document).mouseup(function (e) {
    var container = $("#description, #order, .overlay, #thanks, #demo");
    if (container.has(e.target).length === 0){
      $('#thanks, #description,  #order, .overlay, #demo').fadeOut();
      $('body').css('overflow', '');
    }
  });

  // choose model
  $('.dropdown').on('click', function() {
    $('#myDropdown').toggleClass('showList');
    $('.dropimg').toggleClass('arrowReverse');
  });

  // закрытие селекта при клике вне его

  $(document).mouseup(function (e) {
    var container = $(".dropdown");
    if (container.has(e.target).length === 0){
      $('#myDropdown').removeClass('showList');
      $('.dropimg').removeClass('arrowReverse');
    }
  });

  // расчет цены ремонта дисплея и стекла

  $('#model1').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue1').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue1').eq(i).text());
      $('.dropbtn span').text($('#model1').eq(i).text());
    });
  });

  $('.bold').on('click', function() {
    $(this)
      .addClass('activeBold').siblings().removeClass('activeBold');
  });

  $('#model2').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue2').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue2').eq(i).text());
      $('.dropbtn span').text($('#model2').eq(i).text());
    });
  });

  $('#model3').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue3').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue3').eq(i).text());
      $('.dropbtn span').text($('#model3').eq(i).text());
    });
  });

  $('#model4').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue4').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue4').eq(i).text());
      $('.dropbtn span').text($('#model4').eq(i).text());
    });
  });

  $('#model5').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue5').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue5').eq(i).text());
      $('.dropbtn span').text($('#model5').eq(i).text());
    });
  });

  $('#model6').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue6').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue6').eq(i).text());
      $('.dropbtn span').text($('#model6').eq(i).text());
    });
  });

  $('#model7').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue7').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue7').eq(i).text());
      $('.dropbtn span').text($('#model7').eq(i).text());
    });
  });

  $('#model8').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue8').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue8').eq(i).text());
      $('.dropbtn span').text($('#model8').eq(i).text());
    });
  });

  $('#model9').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValue9').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValue9').eq(i).text());
      $('.dropbtn span').text($('#model9').eq(i).text());
    });
  });

  $('.model10').each(function(i) {
    $(this).on('click', function() {
      $('.glassCost div').text($('.glassCostValueLorem').eq(i).text());
      $('.moduleCost div').text($('.moduleCostValueLorem').eq(i).text());
      $('.dropbtn span').text($('.model10').eq(i).text());
    });
  });

  $('input[name=phone]').mask("+7 (999) 999-99-99");

});


// карты

  
  ymaps.ready(function () {
 
    // Поиск координатов: https://yandex.ru/map-constructor/location-tool/
   
    var myMap = new ymaps.Map('map', {
            center: [55.762814713606964,37.62138723193357],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        });
      
   
    var createPlacemark = function(markerId, coord_1, coord_2, markerImage, name, addr) {
   
      markerId = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: [+coord_1, +coord_2]
        },
        properties: {
          hintContent: name,
          balloonContent: addr
        }
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '../icons/mapPlaceholder.png',
          // Размеры метки.
          iconImageSize: [65, 65],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
      });
   
      myMap.geoObjects.add(markerId);
    };
    myMap.behaviors.disable('drag');
   
    createPlacemark('myPlacemark_5', '55.73594056901514','37.58359799999998', '../icons/mapPlaceholder.png','м Парк Культуры', 'ул. Льва Толстого');
    createPlacemark('myPlacemark_2', '55.73718616823547','37.65470852513119', '../icons/mapPlaceholder.png','м Таганская', 'ул. Большие Каменщики');
    createPlacemark('myPlacemark_3', '55.735669420887824','37.61374099999996', '../icons/mapPlaceholder.png','м Октябрьская', 'ул. Большая Якиманка');
    createPlacemark('myPlacemark_4', '55.783878109036685','37.58649049999993', '../icons/mapPlaceholder.png','м Белорусская', 'ул. Бутырский Вал');
    createPlacemark('myPlacemark_5', '55.79460102401415','37.601714134918126', '../icons/mapPlaceholder.png','м Савеловская', 'ул. Стрелецкая');
   
  });

  $(window).load(function() {
    $('[class^="ymaps"]').find('[class$="ground-pane"]').css('filter', 'grayscale(100%)');
  });




