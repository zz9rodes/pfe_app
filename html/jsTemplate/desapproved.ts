export const renderDesapprovedCompanie = (
  companyName: string ,
  link: string  ,
  reason: string 
) => {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande d'entreprise non approuvée</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .status-badge {
            display: inline-block;
            background-color: #dc3545;
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 25px;
            color: #2c3e50;
        }
        
        .message {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 30px;
            color: #555555;
        }
        
        .rejection-section {
            background-color: #fff5f5;
            border-left: 4px solid #dc3545;
            padding: 25px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .rejection-title {
            font-size: 18px;
            font-weight: 600;
            color: #dc3545;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .rejection-title::before {
            content: "⚠️";
            margin-right: 10px;
            font-size: 20px;
        }
        
        .reasons-list {
            list-style: none;
            padding: 0;
        }
        
        .reasons-list li {
            background-color: #ffffff;
            margin-bottom: 12px;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #fee;
            position: relative;
            padding-left: 45px;
        }
        
        .reasons-list li::before {
            content: "✗";
            position: absolute;
            left: 15px;
            top: 15px;
            color: #dc3545;
            font-weight: bold;
            font-size: 16px;
        }
        
        .reason-title {
            font-weight: 600;
            color: #dc3545;
            margin-bottom: 5px;
        }
        
        .reason-description {
            color: #666;
            font-size: 14px;
        }
        
        .next-steps {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
        }
        
        .next-steps h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .steps-list {
            list-style: none;
            padding: 0;
        }
        
        .steps-list li {
            margin-bottom: 12px;
            padding-left: 30px;
            position: relative;
            color: #555;
        }
        
        .steps-list li::before {
            content: counter(step-counter);
            counter-increment: step-counter;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #667eea;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }
        
        .steps-list {
            counter-reset: step-counter;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .support-section {
            background-color: #e8f4fd;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
        }
        
        .support-title {
            color: #1e40af;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .support-text {
            color: #374151;
            margin-bottom: 15px;
        }
        
        .support-contact {
            color: #1e40af;
            text-decoration: none;
            font-weight: 600;
        }
        
        .footer {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 30px;
            text-align: center;
        }
        
        .footer-content {
            margin-bottom: 20px;
        }
        
        .footer-links {
            margin: 20px 0;
        }
        
        .footer-links a {
            color: #3498db;
            text-decoration: none;
            margin: 0 15px;
        }
        
        .footer-text {
            font-size: 14px;
            opacity: 0.8;
            line-height: 1.5;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .rejection-section, .next-steps, .support-section {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Kini🎁Job</h1>
            <div class="status-badge">Demande non approuvée</div>
        </div>
        
        <div class="content">
            <div class="greeting">
                Bonjour <strong id="companyName">${ companyName }</strong>,
            </div>
            
            <div class="message">
                Nous vous remercions d'avoir soumis votre demande d'inscription sur notre plateforme JobPortal. 
                Après examen attentif de votre dossier, nous regrettons de vous informer que votre demande 
                n'a pas pu être approuvée à ce stade.
            </div>
            
            <!-- Rejection Reasons -->
            <div class="rejection-section">
                <div class="rejection-title">
                    Raisons du refus
                </div>
                <ul class="reasons-list" id="rejectionReasons">
                    <!-- Les raisons seront ajoutées dynamiquement -->
                    ${ reason }
                </ul>
            </div>
            
            <!-- Next Steps -->
            <div class="next-steps">
                <h3>Prochaines étapes</h3>
                <ol class="steps-list">
                    <li>Examinez attentivement les raisons mentionnées ci-dessus</li>
                    <li>Apportez les corrections nécessaires à votre dossier</li>
                    <li>Rassemblez tous les documents requis</li>
                    <li>Soumettez une nouvelle demande via notre plateforme</li>
                </ol>
            </div>
            
            <div class="message">
                Nous encourageons vivement les entreprises sérieuses à corriger les points mentionnés 
                et à resoummettre leur demande. Notre équipe sera ravie de réexaminer votre dossier 
                une fois les améliorations apportées.
            </div>
            
            <div class="cta-section">
                <a href=${ link } class="cta-button" id="resubmitButton">
                    Soumettre une nouvelle demande
                </a>
            </div>
            
            <div class="support-section">
                <div class="support-title">Besoin d'aide ?</div>
                <div class="support-text">
                    Notre équipe support est disponible pour vous accompagner dans votre démarche.
                </div>
                <a href="mailto:support@jobportal.com" class="support-contact">
                    Contacter le support
                </a>
            </div>
        </div>
    </div>
</body>
</html>
`
}
