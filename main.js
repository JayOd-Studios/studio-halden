/* Studio Halden — sample portfolio behaviour.
   Project sheets in a native dialog, a pointer-following preview, a mobile menu. */

(function () {
  "use strict";

  var projects = {
    voise: {
      title: "Church in Voise",
      meta: "Cultural · Voise, Norway · 2019",
      copy: "A 12th-century nave had been repaired so often that its walls had stopped agreeing with each other. We kept the stone, replaced the roof and put a single arched opening where the old porch had been, so the light arrives at the same hour it used to.",
      plate: "p1",
      facts: [
        ["Client", "Voise parish"],
        ["Area", "420 m²"],
        ["Structure", "Stone, glued-laminated timber"],
        ["Status", "Completed 2019"],
        ["Award", "Norsk Arkitekturpris 2021"]
      ]
    },
    hill: {
      title: "House on the Hill",
      meta: "Residential · Ålesund, Norway · 2022",
      copy: "A house for two people and a lot of weather. Two concrete slabs hold a timber box above the ground, so the slope stays visible beneath the living room and the roof becomes a terrace.",
      plate: "p2",
      facts: [
        ["Client", "Private"],
        ["Area", "210 m²"],
        ["Structure", "Concrete, spruce"],
        ["Status", "Completed 2022"],
        ["Photography", "Studio Halden"]
      ]
    },
    atelier: {
      title: "Atelier Nord",
      meta: "Workspace · Oslo, Norway · 2024",
      copy: "A print workshop in a former garage. Everything that could be reused was: the slab, the steel frame, and the north wall, which gives the presses the flat light they need. New work is limited to a single glazed screen.",
      plate: "p3",
      facts: [
        ["Client", "Nord Studio"],
        ["Area", "860 m²"],
        ["Structure", "Reused steel, oak"],
        ["Status", "Completed 2024"],
        ["Award", "Treprisen 2024"]
      ]
    },
    library: {
      title: "Library at Eid",
      meta: "Public · Eid, Norway · 2021",
      copy: "A library that had to fit between two existing walls, with a school on one side and a square on the other. The plan is one long reading room, and a stair that doubles as the auditorium.",
      plate: "p5",
      facts: [
        ["Client", "Eid municipality"],
        ["Area", "1,450 m²"],
        ["Structure", "CLT, glass"],
        ["Status", "Completed 2021"],
        ["Visitors", "112,000 in the first year"]
      ]
    },
    pavilion: {
      title: "Pavilion for a Fjord",
      meta: "Installation · Geiranger, Norway · 2023",
      copy: "A summer pavilion built in four days with a local carpentry class. Twelve spruce frames, no fixings below the high-water line, and a bench on the side that stays dry.",
      plate: "p4",
      facts: [
        ["Client", "Geiranger festival"],
        ["Area", "60 m²"],
        ["Structure", "Spruce, galvanised steel"],
        ["Status", "Temporary, 2023"],
        ["Build", "Four days, twelve students"]
      ]
    },
    tower: {
      title: "Halden Tower",
      meta: "Adaptive reuse · Oslo, Norway · 2026",
      copy: "A 1962 office tower kept rather than demolished. The concrete frame stays; the facade becomes a deep timber loggia, and the ground floor is opened to the street for the first time.",
      plate: "p6",
      facts: [
        ["Client", "Halden Eiendom"],
        ["Area", "3,200 m²"],
        ["Structure", "Existing concrete, new timber"],
        ["Status", "In progress, 2026"],
        ["Carbon", "61% less than a new build"]
      ]
    }
  };

  /* ---------- Mobile navigation ---------- */

  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("siteNav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.querySelector(".sr").textContent = open ? "Close menu" : "Open menu";
    });
    nav.addEventListener("click", function (event) {
      if (!event.target.closest("a")) return;
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.querySelector(".sr").textContent = "Open menu";
    });
  }

  /* ---------- Project dialog ---------- */

  var dialog = document.getElementById("projectDialog");
  var dlgPlate = document.getElementById("dlgPlate");
  var dlgMeta = document.getElementById("dlgMeta");
  var dlgTitle = document.getElementById("dlgTitle");
  var dlgCopy = document.getElementById("dlgCopy");
  var dlgFacts = document.getElementById("dlgFacts");
  var closeBtn = document.getElementById("dlgClose");

  function openProject(id) {
    var project = projects[id];
    if (!project || !dialog) return;

    dlgPlate.className = "plate " + project.plate;
    dlgMeta.textContent = project.meta;
    dlgTitle.textContent = project.title;
    dlgCopy.textContent = project.copy;

    dlgFacts.textContent = "";
    project.facts.forEach(function (pair) {
      var row = document.createElement("div");
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = pair[0];
      dd.textContent = pair[1];
      row.append(dt, dd);
      dlgFacts.appendChild(row);
    });

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    closeBtn.focus();
  }

  function closeProject() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-project]"), function (button) {
    button.addEventListener("click", function () { openProject(button.getAttribute("data-project")); });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeProject);

  if (dialog) {
    /* A click on the backdrop targets the dialog element itself. */
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeProject();
    });
  }

  /* ---------- Hover preview ---------- */

  var preview = document.getElementById("hoverPreview");
  var previewPlate = document.getElementById("hoverPlate");
  var previewLabel = document.getElementById("hoverLabel");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (preview && previewPlate && finePointer && !reduced) {
    document.addEventListener("pointermove", function (event) {
      var row = event.target.closest(".work-row");
      if (!row) {
        preview.classList.remove("show");
        return;
      }

      var project = projects[row.getAttribute("data-project")];
      if (!project) return;

      previewPlate.className = "plate " + project.plate;
      previewLabel.textContent = project.title;
      preview.style.left = event.clientX + "px";
      preview.style.top = event.clientY + "px";
      preview.classList.add("show");
    });

    document.addEventListener("pointerout", function (event) {
      if (!event.relatedTarget || !event.relatedTarget.closest(".work-row")) {
        preview.classList.remove("show");
      }
    });

    window.addEventListener("scroll", function () { preview.classList.remove("show"); }, { passive: true });
  }
})();
