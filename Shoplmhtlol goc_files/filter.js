var page = 1;
var type =
  (rank =
  frame =
  price =
  order =
  champ_str =
  skin_str =
  master_str =
    "");
var searchTimeout;

$(document).ready(function () {
  $(".sl-sebox .swiper-slide").click(function () {
    frame = champ_str = skin_str = master_str = "";
    $('input[data-filter="tim-theo-trang-phuc"]').val("");
    $('input[data-filter="tim-theo-tuong"]').val("");
    type = $(this).attr("data-type");
    $(".swiper-slide").removeClass("active");
    // if (type == 'lien-quan') {
    //     skin_str = champ_str = '';
    //     $('input[data-filter="tim-theo-tuong"]').hide();
    //     $('input[data-filter="tim-theo-trang-phuc"]').hide();
    //     $('select[data-filter="tim-theo-khung"]').closest('li').hide();
    //     $('select[data-filter="tim-theo-rank"]').closest('li').show();
    //     $('select[data-filter="sap-xep-theo"]').closest('li').show();
    //     $('.swiper-slide[data-type!=""]').removeClass('active');
    //     $('.swiper-slide[data-type=""]').removeClass('active');
    //     $(this).addClass('active');
    //     $('#fil').show();
    // } else if (type == 'random-lol-19k' || type == 'random-lol-29k' || type == 'random-lol-49k' || type == 'random-lqm-10k' || type == 'random-lqm-50k') {
    //     skin_str = champ_str = order = price = rank = '';
    //     $('#fil').hide();
    //     $('input[data-filter="tim-theo-tuong"]').hide();
    //     $('input[data-filter="tim-theo-trang-phuc"]').hide();
    //     $('select[data-filter="tim-theo-rank"]').closest('li').hide();
    //     $('select[data-filter="tim-theo-khung"]').closest('li').hide();
    //     $('select[data-filter="sap-xep-theo"]').closest('li').hide();
    //     $('.swiper-slide[data-type=""]').removeClass('active');
    //     $('.swiper-slide[data-type!=""]').removeClass('active');
    //     $(this).addClass('active');
    // } else {
    $('select[data-filter="tim-theo-khung"]').closest("li").show();
    $('input[data-filter="tim-theo-tuong"]').show();
    $('input[data-filter="tim-theo-trang-phuc"]').show();
    $('select[data-filter="tim-theo-rank"]').closest("li").show();
    $('select[data-filter="sap-xep-theo"]').closest("li").show();
    $(this).addClass("active");
    $("#fil").show();

    //}

    page = 1;
    load_account_list();
    return false;
  });

  $(".sl-sebt2").click(function () {
    rank =
      frame =
      price =
      order =
      champ_str =
      skin_str =
      master_str =
      type =
        "";
    page = 1;
    $('.swiper-slide[data-type=""]').addClass("active");
    $('.swiper-slide[data-type!=""]').removeClass("active");
    $('input[data-filter="tim-theo-tuong"]').show();
    $('input[data-filter="tim-theo-trang-phuc"]').show();
    $('select[data-filter="tim-theo-rank"]').closest("li").show();
    $('select[data-filter="tim-theo-khung"]').closest("li").show();
    $('select[data-filter="sap-xep-theo"]').closest("li").show();
    $("#fil").show();
    load_account_list();
  });

  $(".sl-sebt1.btn-filter").click(function () {
    page = 1;
    rank = $('select[data-filter="tim-theo-rank"]').val();
    price = $('select[data-filter="tim-theo-gia"]').val();
    order = $('select[data-filter="sap-xep-theo"]').val();
    champ_str = $('input[data-filter="tim-theo-tuong"]').val();
    skin_str = $('input[data-filter="tim-theo-trang-phuc"]').val();
    master_str = $('input[data-filter="tim-theo-thong-thao"]').val();
    load_account_list();
  });

  $("#list-account").on("click", ".sl-paging ul li.item a[href]", function () {
    page = $(this).attr("data-ci-pagination-page");
    load_account_list();
    return false;
  });

  // Tìm kiếm real-time khi gõ vào input với debounce
  $('input[data-filter="tim-theo-tuong"]').on("input", function () {
    clearTimeout(searchTimeout);
    champ_str = $(this).val();
    page = 1;
    searchTimeout = setTimeout(function () {
      load_account_list();
    }, 500);
  });

  $('input[data-filter="tim-theo-trang-phuc"]').on("input", function () {
    clearTimeout(searchTimeout);
    skin_str = $(this).val();
    page = 1;
    searchTimeout = setTimeout(function () {
      load_account_list();
    }, 500);
  });

  $('input[data-filter="tim-theo-thong-thao"]').on("input", function () {
    clearTimeout(searchTimeout);
    master_str = $(this).val();
    page = 1;
    searchTimeout = setTimeout(function () {
      load_account_list();
    }, 500);
  });

  // Tìm kiếm khi thay đổi select
  $('select[data-filter="tim-theo-rank"]').on("change", function () {
    rank = $(this).val();
    page = 1;
    load_account_list();
  });

  $('select[data-filter="tim-theo-gia"]').on("change", function () {
    price = $(this).val();
    page = 1;
    load_account_list();
  });

  $('select[data-filter="sap-xep-theo"]').on("change", function () {
    order = $(this).val();
    page = 1;
    load_account_list();
  });
});

function load_account_list() {
  var data_post = {
    page: page,
    rank: rank,
    khung: frame,
    gia: price,
    sapxep: order,
    tuong: champ_str,
    trangphuc: skin_str,
    thongthao: master_str,
    loai: type,
  };
  $("#list-account").empty();
  $("#loading").show();

  $.post(
    "public/load/account_list.php",
    data_post,
    function (data) {
      if (data.url_filter) {
        history.pushState({}, null, data.url_filter);
      } else {
        history.pushState({}, null, location.pathname);
      }
      $("#list-account").html(data.html);
      $("#loading").hide();
    },
    "json"
  ).fail(function () {
    $("#loading").hide();
    $("#list-account").html(
      '<div class="alert alert-danger">Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!</div>'
    );
  });
}
