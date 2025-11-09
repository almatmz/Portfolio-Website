$(function () {
  const DATA_URL = "data/gallery-items.json";
  const $grid = $("#galleryGrid");
  let items = [];
  let currentIndex = 0;

  $.getJSON(DATA_URL)
    .done((data) => {
      items = Array.isArray(data) ? data : [];
      render();
    })
    .fail((err) => {
      $grid.html(
        '<div class="alert alert-danger">Failed to load gallery JSON.</div>'
      );
      console.error(err);
    });

  function render() {
    if (!items.length) {
      $grid.html('<p class="text-muted">No items.</p>');
      return;
    }
    $grid.empty();
    items.forEach((it, i) => {
      const $item = $(`
        <div class="gallery-item" data-category="${it.category}" data-index="${i}">
          <div class="gallery-card">
            <img src="${it.src}" alt="${it.title}" loading="lazy">
            <div class="meta">
              <span class="title">${it.title}</span>
              <span class="chip text-uppercase">${it.category}</span>
            </div>
          </div>
          <div class="pt-2 d-flex justify-content-end">
            <button class="btn btn-sm btn-outline-primary open-lightbox" data-index="${i}">View</button>
          </div>
        </div>
      `).css({ opacity: 0 });
      $grid.append($item);
      setTimeout(() => {
        $item.animate({ opacity: 1 }, 240);
      }, i * 70);
    });
  }

  $(".filter-controls").on("click", "button", function () {
    $(".filter-controls button").removeClass("active");
    $(this).addClass("active");
    const f = $(this).data("filter");
    const $all = $grid.children(".gallery-item");
    const $matches =
      f === "all"
        ? $all
        : $all.filter(function () {
            return $(this).data("category") === f;
          });

    $all.not($matches).stop(true, true).fadeOut(180);
    $matches.each(function () {
      const $it = $(this);
      if ($it.is(":hidden")) {
        $it.css("opacity", 0).fadeIn(0).animate({ opacity: 1 }, 200);
      } else {
        $it
          .stop(true, true)
          .animate({ opacity: 0.9 }, 90)
          .animate({ opacity: 1 }, 130);
      }
    });
  });

  $grid.on("click", ".open-lightbox", function () {
    currentIndex = parseInt($(this).data("index"), 10) || 0;
    showInLightbox(items[currentIndex]);
    new bootstrap.Modal("#lightboxModal").show();
  });

  $("#prevImage").on("click", function () {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showInLightbox(items[currentIndex]);
  });

  $("#nextImage").on("click", function () {
    currentIndex = (currentIndex + 1) % items.length;
    showInLightbox(items[currentIndex]);
  });

  function showInLightbox(item) {
    const $img = $("#lightboxImage");
    const $title = $("#lightboxTitle");

    $img.stop(true, true).removeClass("fade-in").addClass("fade-out");

    setTimeout(() => {
      $img.attr({ src: item.src, alt: item.title });
      $title.text(item.title);

      const onLoad = () => {
        $img.off("load", onLoad);
        requestAnimationFrame(() => {
          $img.removeClass("fade-out").addClass("fade-in");
        });
      };
      $img.on("load", onLoad);

      setTimeout(() => {
        $img.triggerHandler("load");
      }, 250);
    }, 120);
  }
});
