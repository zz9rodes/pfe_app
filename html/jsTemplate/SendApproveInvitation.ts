export const renderSendApprovedMessage = (guestName: string) => {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation à rejoindre notre entreprise</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        /* Base Styles */
/* From Uiverse.io by Yaya12085 */ 
.card {
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
}

.card a {
  text-decoration: none
}

.content {
  padding: 1.1rem;
}

.image {
  object-fit: cover;
  width: 100%;
  height: 150px;
  background-color: rgb(239, 205, 255);
}

.title {
  color: #111827;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
}

.desc {
  margin-top: 0.5rem;
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.action {
  display: inline-flex;
  margin-top: 1rem;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  align-items: center;
  gap: 0.25rem;
  background-color: #2563EB;
  padding: 4px 8px;
  border-radius: 4px;
}

.action span {
  transition: .3s ease;
}

.action:hover span {
  transform: translateX(4px);
}

    </style>
</head>
<body>

    <!-- From Uiverse.io by Yaya12085 --> 
<div class="card">
 <div class="image"></div>
  <div class="content">
    <a href="#">
      <span class="title">
        Nouveau Membre de dans l'equipe ✨🎉🎉🎉
      </span>
    </a>

    <p class="desc">
        ${guestName}  viens de rejoindre votre compagnie grace au liens d'invitation que vous avez partager
        il fait maintenant partie de votre equipe avec les droit qui lui on ete accorder 🎉
    </p>
  </div>
</div>
    
</body>
</html>`
}
