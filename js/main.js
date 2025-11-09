/* Final theme toggle logic (icon-only) */
$(function () {
  function syncToggle() {
    $("#themeSwitch").attr(
      "aria-pressed",
      $("html").hasClass("light-theme") ? "true" : "false"
    );
  }
  syncToggle();

  $("#themeSwitch").on("click", function () {
    $("html").toggleClass("light-theme");
    localStorage.setItem(
      "theme",
      $("html").hasClass("light-theme") ? "light" : "dark"
    );
    syncToggle();
  });

  $("#year").text(new Date().getFullYear());

  // Counters (if present)
  $(".counter").each(function () {
    const $el = $(this),
      target = +($el.data("target") || 0);
    let n = 0,
      step = Math.max(1, Math.ceil(target / 90));
    const id = setInterval(() => {
      n += step;
      if (n >= target) {
        n = target;
        clearInterval(id);
      }
      $el.text(n);
    }, 20);
  });

  // Featured project modal (if exists on page)
  $(".view-details").on("click", function () {
    const title = $(this).data("title");
    const desc = $(this).data("desc");
    const img = $(this).data("img");
    $(".modal-project-title").text(title);
    $(".modal-project-desc").text(desc);
    $(".modal-project-img").attr({ src: img, alt: title });
    new bootstrap.Modal("#projectModal").show();
  });

  // Interest form inside modal
  $("#interestForm").on("submit", function (e) {
    e.preventDefault();
    const f = $(this);
    const name = f.find('[name="name"]').val().trim();
    const email = f.find('[name="email"]').val().trim();
    const msg = f.find('[name="message"]').val().trim();
    const fb = f.find(".form-feedback");
    const emailOK = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
    if (!name || !emailOK || !msg) {
      fb.html(
        '<div class="alert alert-danger py-1 my-1">Fill all fields correctly.</div>'
      );
      return;
    }
    fb.html(
      '<div class="alert alert-success py-1 my-1">Sent! I will respond soon.</div>'
    );
    this.reset();
  });
});
