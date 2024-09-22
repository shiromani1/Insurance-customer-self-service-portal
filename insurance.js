document.addEventListener('DOMContentLoaded', function () {
  const fileClaimBtn = document.getElementById('fileClaimBtn');
  const trackClaimBtn = document.getElementById('trackClaimBtn');
  const chatBotBtn = document.getElementById('chatBotBtn');
  const knowledgeBaseBtn = document.getElementById('knowledgeBaseBtn');

  const claimForm = document.getElementById('claimForm');
  const claimTracking = document.getElementById('claimTracking');
  const chatBot = document.getElementById('chatBot');
  const knowledgeBase = document.getElementById('knowledgeBase');

  const newClaimForm = document.getElementById('newClaimForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const claimsTableBody = document.querySelector('#claimsTable tbody');

  const searchBar = document.getElementById('searchBar');
  const searchResults = document.getElementById('searchResults');

  // Store claims
  let claims = [];

  // Dummy knowledge base articles
  const knowledgeBaseArticles = [
    'How to file an insurance claim',
    'Understanding claim approval process',
    'What documents do I need to submit a claim?',
    'How to track your insurance claim',
    'Contacting customer support for claims'
  ];

  // Show the form to file a new claim
  fileClaimBtn.addEventListener('click', () => {
    toggleSections(claimForm);
  });

  // Show the claim tracking table
  trackClaimBtn.addEventListener('click', () => {
    toggleSections(claimTracking);
    renderClaimsTable();
  });

  // Show the chatbot section
  chatBotBtn.addEventListener('click', () => {
    toggleSections(chatBot);
  });

  // Show the knowledge base search
  knowledgeBaseBtn.addEventListener('click', () => {
    toggleSections(knowledgeBase);
  });

  // Submit the claim form
  newClaimForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value;

    const claimNumber = 'CLM' + (claims.length + 1).toString().padStart(3, '0');
    const newClaim = {
      claimNumber,
      policyNumber,
      incidentDate,
      incidentDescription,
      status: 'In Review',
      submissionDate: new Date().toLocaleDateString()
    };

    claims.push(newClaim);
    formSuccessMessage.classList.remove('hidden');
    newClaimForm.reset();

    setTimeout(() => {
      formSuccessMessage.classList.add('hidden');
    }, 3000);
  });

  // Render claims in the tracking table
  function renderClaimsTable() {
    claimsTableBody.innerHTML = '';
    claims.forEach(claim => {
      const row = `<tr>
        <td>${claim.claimNumber}</td>
        <td>${claim.status}</td>
        <td>${claim.submissionDate}</td>
      </tr>`;
      claimsTableBody.insertAdjacentHTML('beforeend', row);
    });
  }

  // Search the knowledge base
  searchBar.addEventListener('input', function () {
    const query = searchBar.value.toLowerCase();
    const filteredArticles = knowledgeBaseArticles.filter(article =>
      article.toLowerCase().includes(query)
    );

    searchResults.innerHTML = '';
    filteredArticles.forEach(article => {
      const li = document.createElement('li');
      li.textContent = article;
      searchResults.appendChild(li);
    });
  });

  // Toggle between sections
  function toggleSections(sectionToShow) {
    [claimForm, claimTracking, chatBot, knowledgeBase].forEach(section => {
      if (section === sectionToShow) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }
});
