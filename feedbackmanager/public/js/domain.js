(function initDomain() {
  if (window.location.href.toString().includes('localhost')) {
      window.localStorage.domain = 'http://localhost:3000';
  } else {
      window.localStorage.domain = 'https://ti-manager.com';
  }
}())
