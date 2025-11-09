$(function () {
  const form = $("#contactForm");
  form.on("submit", function (e) {
    e.preventDefault();
    const name = form.find('[name="name"]').val().trim();
    const email = form.find('[name="email"]').val().trim();
    const pw = form.find('[name="password"]').val();
    const cpw = form.find('[name="confirmPassword"]').val();
    const msg = form.find('[name="message"]').val().trim();
    const fb = form.find(".form-feedback");
    let ok = true;
    const emailOK = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
    function inv($f) {
      $f.addClass("is-invalid").removeClass("is-valid");
      ok = false;
    }
    function val($f) {
      $f.addClass("is-valid").removeClass("is-invalid");
    }
    name ? val(form.find('[name="name"]')) : inv(form.find('[name="name"]'));
    emailOK
      ? val(form.find('[name="email"]'))
      : inv(form.find('[name="email"]'));
    pw
      ? val(form.find('[name="password"]'))
      : inv(form.find('[name="password"]'));
    pw && cpw && pw === cpw
      ? val(form.find('[name="confirmPassword"]'))
      : inv(form.find('[name="confirmPassword"]'));
    msg
      ? val(form.find('[name="message"]'))
      : inv(form.find('[name="message"]'));
    if (!ok) {
      fb.html(
        '<div class="alert alert-danger py-2">Fix highlighted fields.</div>'
      );
      return;
    }
    fb.html(
      '<div class="alert alert-success py-2">Message sent successfully!</div>'
    );
    this.reset();
    resetStrength();
    form.find(".is-valid").removeClass("is-valid");
  });

  $("#passwordField").on("input", function () {
    const v = $(this).val();
    const s = strength(v);
    updateBar(s.score, s.label, s.color);
  });

  function strength(p) {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (p.length >= 12) score++;
    let label = "Weak",
      color = "#dc3545";
    if (score === 2) {
      label = "Fair";
      color = "#fd7e14";
    } else if (score === 3) {
      label = "Medium";
      color: "#ffc107";
    } else if (score === 4) {
      label = "Strong";
      color: "#198754";
    } else if (score >= 5) {
      label = "Very Strong";
      color: "#0dcaf0";
    }
    return { score, label, color };
  }
  function updateBar(score, label, color) {
    $(".strength-bar").css({
      width: (score / 5) * 100 + "%",
      background: color,
    });
    $("#strengthLabel").text(label);
  }
  function resetStrength() {
    $(".strength-bar").css({ width: 0, background: "#dc3545" });
    $("#strengthLabel").text("Enter password");
  }
  window.resetStrength = resetStrength;
});
