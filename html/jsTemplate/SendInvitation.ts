export const renderSendInvitationMessage = (companyName: string, guestName: string, conpanyAvaratarUrl:string,link: string) => {
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
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #333;
        }
        
        /* Layout */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
        }
        
        /* Colors */
        .gradient-bg {
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            color: white;
        }
        
        .bg-blue-50 { background-color: #eff6ff; }
        .bg-purple-50 { background-color: #f5f3ff; }
        .bg-gray-50 { background-color: #f9fafb; }
        
        /* Typography */
        h1, h2, h3 {
            margin-top: 0;
            line-height: 1.2;
        }
        
        h1 { font-size: 2rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; }
        
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        
        .text-white { color: white; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-blue-600 { color: #2563eb; }
        .text-purple-600 { color: #7c3aed; }
        
        /* Spacing */
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .p-12 { padding: 3rem; }
        .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mr-4 { margin-right: 1rem; }
        .mr-6 { margin-right: 1.5rem; }
        
        /* Flex & Grid */
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .flex-shrink-0 { flex-shrink: 0; }
        
        .grid { display: grid; }
        .gap-6 { gap: 1.5rem; }
        
        /* Components */
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-full { border-radius: 9999px; }
        
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        
        .border-t { border-top: 1px solid; }
        .border-gray-200 { border-color: #e5e7eb; }
        
        .hover-scale {
            transition: transform 0.3s ease;
        }
        .hover-scale:hover {
            transform: translateY(-5px);
        }
        
        /* Buttons */
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            color: white;
            font-weight: 700;
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            text-decoration: none;
            transition: all 0.3s;
        }
        .btn:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        /* Images */
        .rounded-full { border-radius: 9999px; }
        .object-cover { object-fit: cover; }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .w-20 { width: 5rem; }
        .h-20 { height: 5rem; }
        
        /* Responsive */
        @media (max-width: 640px) {
            .mobile-stack {
                flex-direction: column;
            }
            .mobile-text-center {
                text-align: center;
            }
            .mobile-px-4 {
                padding-left: 1rem;
                padding-right: 1rem;
            }
            .mobile-mt-4 {
                margin-top: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="gradient-bg text-white py-6">
        <div class="container" style="max-width: 800px;">
            <div class="flex justify-between items-center mobile-stack">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold">${companyName}</h1>
                </div>
                <div class="text-sm mobile-text-center mobile-mt-4">
                    <span class="opacity-80">Invitation personnelle</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container" style="max-width: 800px; padding: 3rem 1.5rem;">
        <div class="email-container">
            <!-- Hero Section -->
            <div class="gradient-bg text-white p-8 md:p-12 text-center">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">Rejoignez notre équipe d'exception</h1>
              </div>
            
            <!-- Content -->
            <div class="p-8 md:p-12">
                <div class="flex items-start mobile-stack">
                    <div>
                        <p class="text-gray-700 mb-6">
                            Bonjour <span class="font-semibold">${guestName}</span>,
                        </p>
                        <p class="text-gray-700 mb-6">
                            Après avoir examiné votre profil et votre parcours professionnel, nous sommes convaincus que vous seriez un atout précieux pour notre entreprise. Chez <span class="font-semibold text-blue-600"${companyName}</span>, nous construisons l'avenir avec des talents comme le vôtre.
                        </p>
                    </div>
                </div>
                
                <!-- Offer Highlights -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                    <div class="bg-blue-50 rounded-lg p-6 hover-scale" style="background-color: #eff6ff;">
                        <div class="text-blue-600 mb-3">
                            <i class="fas fa-medal text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-lg mb-2">Opportunité unique</h3>
                        <p class="text-gray-600 text-sm">Intégrez une équipe dynamique avec des perspectives d'évolution rapides</p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-6 hover-scale">
                        <div class="text-purple-600 mb-3">
                            <i class="fas fa-chart-line text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-lg mb-2">Projets ambitieux</h3>
                        <p class="text-gray-600 text-sm">Participez à des initiatives stratégiques avec un impact réel</p>
                    </div>

                </div>
                
                <!-- CTA -->
                <div class="text-center mb-8">
                    <p class="text-gray-700 mb-6 font-medium">Prêt(e) à relever ce défi avec nous ?</p>
                    <a href=${link} class="btn">
                        Confirmer votre intérêt
                    </a>
                    <p class="text-sm text-gray-500 mt-3">Réponse souhaitée avant le [date]</p>
                </div>
                
                <!-- Next Steps -->
            </div>
            
            <!-- Testimonial -->
            <div style="background-color: #f9fafb; padding: 2rem; border-top: 1px solid #e5e7eb;">
                <div style="max-width: 42rem; margin: 0 auto; text-align: center;">
                    <div class="text-blue-600 mb-4">
                        <i class="fas fa-quote-left text-3xl opacity-30"></i>
                    </div>
                    <div class="flex items-center justify-center">
                        <img src=${conpanyAvaratarUrl} alt="Témoignage" class="w-12 h-12 rounded-full object-cover mr-4">
                        <div>
                            <p class="font-semibold">Alexandre Dubois</p>
                            <p class="text-sm text-gray-500">Directeur Marketing,${companyName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="container" style="max-width: 800px; padding: 0 1.5rem 3rem;">
        <div style="text-align: center; color: #6b7280; font-size: 0.875rem;">
            <div class="mb-6">
                <p class="mb-2">Vous avez des questions ? Contactez notre équipe recrutement :</p>
                <a href="mailto:recrutement@talentvision.com" class="text-blue-600 hover:underline">recrutement@talentvision.com</a>
            </div>            
        </div>
    </div>
</body>
</html>`
}
