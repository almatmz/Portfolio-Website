$(function () {
  const tbody = $("#projectsTbody");
  const addForm = $("#addProjectForm");
  const editForm = $("#editProjectForm");
  const editModal = new bootstrap.Modal("#editProjectModal");
  const addModal = new bootstrap.Modal("#addProjectModal");

  let projects = [
    {
      id: 1,
      title: "Scout kz",
      category: "web",
      year: 2025,
      repo: "https://github.com/almatmz/Scout_kz",
    },
    {
      id: 2,
      title: "E-Commerce Simulation",
      category: "java",
      year: 2024,
      repo: "https://github.com/almatmz/E-Commerce-Platform",
    },
    {
      id: 3,
      title: "Student Management System",
      category: "SpringBoot",
      year: 2025,
      repo: "https://github.com/almatmz/StudentManagementSystem",
    },
    {
      id: 4,
      title: "Expense Tracker",
      category: "Python",
      year: 2024,
      repo: "https://github.com/almatmz/ExpenseTracker",
    },
  ];
  let sortState = { titleAsc: true, yearAsc: true };

  function row(p) {
    return `<tr data-id="${p.id}">
      <td><strong>${p.title}</strong></td>
      <td>${p.category}</td>
      <td>${p.year}</td>
      <td><a class="repo-pill" href="${p.repo}" target="_blank" rel="noopener">↗ Repo</a></td>
      <td class="text-end action-buttons">
        <button class="btn btn-primary btn-sm edit-btn">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </td>
    </tr>`;
  }
  function render(list) {
    tbody.empty();
    list.forEach((p, i) => {
      const $r = $(row(p)).css({ opacity: 0, transform: "translateY(8px)" });
      tbody.append($r);
      setTimeout(() => {
        $r.animate({ opacity: 1 }, 220).css("transform", "");
      }, 50 * i);
    });
  }
  render(projects);

  addForm.on("submit", function (e) {
    e.preventDefault();
    const t = addForm.find('[name="title"]').val().trim();
    const c = addForm.find('[name="category"]').val().trim();
    const y = +addForm.find('[name="year"]').val();
    const r = addForm.find('[name="repo"]').val().trim();
    const fb = addForm.find(".add-feedback");
    if (!t || !c || !y || !r) {
      fb.html('<span class="text-danger">All fields required.</span>');
      return;
    }
    projects.push({ id: Date.now(), title: t, category: c, year: y, repo: r });
    render(projects);
    addForm[0].reset();
    fb.html('<span class="text-success">Added!</span>');
    setTimeout(() => fb.empty(), 1200);
    addModal.hide();
  });

  tbody.on("click", ".edit-btn", function () {
    const id = +$(this).closest("tr").data("id");
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    editForm.find('[name="id"]').val(p.id);
    editForm.find('[name="title"]').val(p.title);
    editForm.find('[name="category"]').val(p.category);
    editForm.find('[name="year"]').val(p.year);
    editForm.find('[name="repo"]').val(p.repo);
    editModal.show();
  });

  editForm.on("submit", function (e) {
    e.preventDefault();
    const id = +editForm.find('[name="id"]').val();
    const t = editForm.find('[name="title"]').val().trim();
    const c = editForm.find('[name="category"]').val().trim();
    const y = +editForm.find('[name="year"]').val();
    const r = editForm.find('[name="repo"]').val().trim();
    const i = projects.findIndex((p) => p.id === id);
    if (i > -1) {
      projects[i] = { id, title: t, category: c, year: y, repo: r };
      render(projects);
      editModal.hide();
    }
  });

  tbody.on("click", ".delete-btn", function () {
    if (!confirm("Delete project?")) return;
    const id = +$(this).closest("tr").data("id");
    projects = projects.filter((p) => p.id !== id);
    $(this)
      .closest("tr")
      .fadeOut(220, () => render(projects));
  });

  $("#crudSearch").on("input", function () {
    const term = $(this).val().toLowerCase();
    $("#projectsTbody tr").each(function () {
      const text = $(this).text().toLowerCase();
      $(this).toggle(text.includes(term));
    });
  });

  $("#sortTitle").on("click", function () {
    projects.sort((a, b) =>
      sortState.titleAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    sortState.titleAsc = !sortState.titleAsc;
    render(projects);
  });
  $("#sortYear").on("click", function () {
    projects.sort((a, b) =>
      sortState.yearAsc ? a.year - b.year : b.year - a.year
    );
    sortState.yearAsc = !sortState.yearAsc;
    render(projects);
  });
});
