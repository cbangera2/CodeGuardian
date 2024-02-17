import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="stylesheet" href="styles.css">
    
    <link rel="icon" type="image/x-icon" href="/Users/norac/Desktop/landing_page/Screenshot_2024-02-17_at_9.36.19_AM-removebg-preview.png" />
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    
    <link href="css/styles.css" rel="stylesheet" />
  </head>
  <body class="d-flex flex-column h-100">
    <main class="flex-shrink-0">
      
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container px-5">
          <a class="navbar-brand" href="index.html">
            <img src="logo.png" alt="" style="width: 50px; height: 50px; margin-right: 10px;"> CodeGuardian </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <!-- <a class="nav-link" href="index">Home</a></li> -->
              <!-- <a class="nav-link" href="about">About</a></li><li class="nav-item"><a class="nav-link" href="publications"></a></li><li class="nav-item"><a class="nav-link" href="submit"></a></li><li class="nav-item"><a class="nav-link" href="faq">FAQ</a></li><li class="nav-item"><a class="nav-link" href="contact">Contact</a></li> --> --> -->
              <li class="nav-item dropdown"></li>
            </ul>
            </ul>
          </div>
        </div>
      </nav>
      
      <section class="py-5" style="background-color:#000;">
        <div class="container px-5">
          <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
              <div class="my-5 text-center text-xl-start">
                <h1 class="display-3 fw-bolder text-white mb-2">CodeGuardian</h1>
                <h3 class="display-8 fw-bolder text-white mb-2">Protecting Academic Integrity in Programming Education </h3>
                <p class="lead fw-normal text-white-50 mb-4">The ultimate VSCode extension for students, educators, and employers to ensure originality and authenticity in code submissions. </p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <a class="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                  <a class="btn btn-outline-light btn-lg px-4" href="about">Learn More</a>
                </div>
              </div>
            </div>
            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <img class="img-fluid rounded-3 my-5" src="first.gif" alt="..." style="width: 70%; height: auto;" />
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-5" id="features" style="background-color:#fff;">
        <div class="container px-5 my-5">
          <div class="row gx-5">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h2 class="fw-bolder mb-0">Forensics. <br>Pedagogy. <br> Safeguard. <br> Provenance. </h2>
            </div>
            <div class="col-lg-8">
              <div class="row gx-5 row-cols-1 row-cols-md-2">
                  <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-collection"></i>
                  </div>
                  <h2 class="h5">Forensics</h2>
                  <p class="mb-0"> Employs sophisticated analysis to trace code origins, distinguishing between inspired learning and outright duplication. </p>
                </div>
                <div class="col mb-5 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-building"></i>
                  </div>
                  <h2 class="h5">Pedagogy</h2>
                  <p class="mb-0">Enhances educational methodologies by integrating technology that teaches ethical coding practices through active engagement. </p>
                </div>
                <div class="col mb-5 mb-md-0 h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-toggles2"></i>
                  </div>
                  <h2 class="h5">Safeguard</h2>
                  <p class="mb-0">Acts as a digital sentinel, vigilantly protecting the sanctity of intellectual property in the coding realm.</p>
                </div>
                <div class="col h-100">
                  <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i class="bi bi-toggles2"></i>
                  </div>
                  <h2 class="h5">Provenance</h2>
                  <p class="mb-0">Precisely tracks the lineage of code snippets, offering a transparent audit trail from inception to submission. </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-5" style="background-color:#000; color:#fff;">
        <div class="container px-5">
          <div class="row gx-5 align-items-start"> <!-- Added align-items-start -->
            <div class="col-lg-5" style="margin-left: -15px;">

              <h1 style="font-size: 3em; font-weight: bold;">Promoting academic integrity in computer science education</h1>
              <h4 style="font-size: 1em; font-weight: normal;">CodeGuardian is an advanced plagiarism detection tool designed for computer science courses. It seamlessly integrates with popular learning management systems and provides detailed reports to identify potential academic integrity violations.</h4>
            </div>
            <div class="col-lg-4 d-none d-lg-block">
              <img class="img-fluid rounded-3" src="022.gif" alt="Descriptive Alt Text" style="max-width: 100%; margin-top: -10px; margin-left:200px;border-radius: 8px;"> <!-- Negative margin-top value -->
            </div>
          </div>
        </div>
      </section>
      

      <section class="py-5" style="background-color:#fff;">
        <div class="container px-5">
          <div class="col-lg-5" style="margin-left: -12px;">
            <h1 style="font-size: 3em; font-weight: bold;">For Students</h1>
            <h4 style="font-size: 1em; font-weight: normal;">
              Easily submit assignments and projects while ensuring original work.
            </h4>
            <ul style="list-style-type:none; padding: 0;">
              <li><strong>Enhance Learning Experience:</strong> Engage actively with assignments for a deeper understanding of programming concepts.</li>
              <li><strong>Collaborate Authentically:</strong> Ensure equal authenticity and transparency in group projects.</li>
              <li><strong>Easy Assignment Submission:</strong> Submit assignments directly through VSCode, simplifying your academic workload.</li>
              <li><strong>Track Your Growth:</strong> Monitor your coding activity and progress, identifying strengths and areas for development.</li>
            </ul>
          </div>
        </div>
      </section>
      




      <section class="py-5" style="background-color:#000; color:#fff;">
        <div class="container px-5" >
            <div class="col-lg-5" style="margin-left: -12px;">



          <h1 style="font-size: 3em; font-weight: bold;">For Educators </h1>
          <h4 style="font-size: 1em; font-weight: normal;">Streamline the process of checking for plagiarism and uphold academic standards with ease. </h4>
        </div>
    </section>

    <section class="py-5" style="background-color:#fff;">
      <div class="container px-5">
        <h1 style="font-size: 3em; font-weight: bold;">What our users are saying </h1>
        <h4 style="font-size: 1em; font-weight: normal;">“CodeGuardian has been an invaluable tool for our institution. It has helped us maintain academic integrity while providing a seamless experience for both students and educators.” <br> - Sarah Johnson, Dean of Academic Affairs </h4>
      </div>
    </section>
    
    <div class="py-5 bg-light" style="background-color:#000;">
      <div class="container px-5 my-5">
        <div class="row gx-5 justify-content-center">
          <div class="col-lg-10 col-xl-7">
            <div class="text-center"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <footer class="bg-dark py-4 mt-auto">
      <div class="container px-5">
        <div class="row align-items-center justify-content-between flex-column flex-sm-row">
          <div class="col-auto">
            <div class="small m-0 text-white">Copyright &copy; CodeGuardian 2024</div>
          </div>
          <div class="col-auto">
            <a class="link-light small" href="#!">Privacy</a>
            <span class="text-white mx-1">&middot;</span>
            <a class="link-light small" href="#!">Terms</a>
            <span class="text-white mx-1">&middot;</span>
            <a class="link-light small" href="#!">Contact</a>
          </div>
        </div>
      </div>
    </footer>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script src="js/scripts.js"></script>
</body>
</html>
    
    
    
    </div>
  );
}
