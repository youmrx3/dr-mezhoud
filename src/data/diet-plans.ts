export interface DietPlanEntry {
  slug: string
  titre: string
  description: string
  category: string
  content: string
}

const plans: DietPlanEntry[] = [
  // ── Régime hyposodé ──
  {
    slug: "regime-hypersode-principes",
    titre: "Principes du régime hyposodé",
    description: "Les fondamentaux d'une alimentation pauvre en sodium pour protéger vos reins et votre cœur.",
    category: "Régime hyposodé",
    content: `<h2>Pourquoi réduire le sel ?</h2>
<p>Le sodium est un minéral essentiel mais son excès est dangereux pour les reins et le cœur. Un régime hyposodé limite l'apport à moins de 2 grammes de sodium par jour (soit 5 grammes de sel).</p>
<h3>Objectifs</h3>
<ul>
<li>Réduire la pression artérielle</li>
<li>Limiter la rétention d'eau et les œdèmes</li>
<li>Ralentir la progression de l'insuffisance rénale</li>
<li>Réduire la charge de travail des reins</li>
</ul>
<h3>Conseils pratiques</h3>
<p>Cuisinez sans sel et ajoutez des herbes aromatiques. Lisez les étiquettes des aliments transformés. Retirez la salière de la table. Privilégiez le fait-maison.</p>`,
  },
  {
    slug: "regime-hypersode-menus",
    titre: "Menus type pour régime hyposodé",
    description: "Exemples de menus journaliers pauvres en sodium pour la semaine.",
    category: "Régime hyposodé",
    content: `<h2>Menu type — Jour 1</h2>
<p>Petit-déjeuner : Thé vert, pain sans sel grillé, beurre non salé, confiture.</p>
<p>Déjeuner : Salade de tomates au basilic, filet de merlan à la vapeur, riz blanc, haricots verts, compote de pommes.</p>
<p>Dîner : Soupe de courgettes maison, omelette aux fines herbes, salade verte, yaourt nature.</p>
<h2>Menu type — Jour 2</h2>
<p>Petit-déjeuner : Café léger, flocons d'avoine, lait demi-écrémé, poire.</p>
<p>Déjeuner : Carottes râpées, escalope de poulet grillée, purée de pommes de terre maison (sans sel), fromage blanc 0%.</p>
<p>Dîner : Velouté de potiron, dos de cabillaud au four, courgettes sautées à l'huile d'olive, salade de fruits.</p>`,
  },
  {
    slug: "regime-hypersode-aliments",
    titre: "Aliments autorisés et interdits",
    description: "Guide complet des aliments à privilégier et à éviter dans un régime pauvre en sel.",
    category: "Régime hyposodé",
    content: `<h2>Aliments autorisés (à volonté)</h2>
<ul>
<li>Fruits et légumes frais ou surgelés nature</li>
<li>Viandes et volailles fraîches non préparées</li>
<li>Poissons frais ou surgelés nature</li>
<li>Œufs</li>
<li>Lait, yaourt nature, fromage blanc</li>
<li>Pâtes, riz, semoule, pommes de terre</li>
<li>Huiles végétales, beurre non salé</li>
<li>Herbes aromatiques, épices, ail, oignon</li>
</ul>
<h2>Aliments à éviter</h2>
<ul>
<li>Charcuterie (jambon, saucisson, merguez)</li>
<li>Fromages fermentés (roquefort, comté, emmental)</li>
<li>Plats préparés et conserves</li>
<li>Bouillons cubes, sauces industrielles, ketchup</li>
<li>Pain, biscottes et céréales du commerce</li>
<li>Chips, apéritifs salés, olives</li>
<li>Eaux gazeuses riches en sodium (Badoit, Vichy)</li>
</ul>`,
  },
  // ── Régime hypoprotidique ──
  {
    slug: "regime-hypoprotidique-principes",
    titre: "Principes du régime hypoprotidique",
    description: "Comprendre pourquoi et comment réduire l'apport en protéines pour préserver la fonction rénale.",
    category: "Régime hypoprotidique",
    content: `<h2>Objectifs du régime hypoprotidique</h2>
<p>Réduire la charge de filtration des reins en limitant l'apport protidique à 0.6-0.8 g/kg/jour selon le stade de la MRC.</p>
<h3>Pour qui ?</h3>
<p>Ce régime est destiné aux patients atteints d'insuffisance rénale chronique aux stades 3 à 5 non dialysés.</p>
<h3>Répartition journalière</h3>
<ul>
<li>Protéines : 0.6 à 0.8 g/kg de poids corporel</li>
<li>Calories : 30-35 kcal/kg pour éviter la dénutrition</li>
<li>Lipides : 35% des apports énergétiques</li>
<li>Glucides : 50-55% des apports énergétiques</li>
</ul>
<p>Un suivi diététique régulier est essentiel pour prévenir la dénutrition. Des suppléments peuvent être prescrits si nécessaire.</p>`,
  },
  {
    slug: "regime-hypoprotidique-menus",
    titre: "Menus type pauvres en protéines",
    description: "Exemples de repas équilibrés avec un apport protidique contrôlé.",
    category: "Régime hypoprotidique",
    content: `<h2>Menu type (0.6 g/kg/jour)</h2>
<p>Petit-déjeuner : Tisane, pain sans sel (40g), confiture, beurre.</p>
<p>Déjeuner : Salade de concombre, 100g de volaille grillée, 150g de pâtes, courgettes sautées, fruit cuit.</p>
<p>Dîner : Potage de légumes, 2 œufs durs, 150g de riz, épinards en branches, salade de fruits.</p>
<h2>Substituts protéiques</h2>
<p>Pour maintenir un apport calorique suffisant sans augmenter les protéines, utilisez :</p>
<ul>
<li>Beurre, crème, huiles végétales</li>
<li>Confiture, miel, sucre</li>
<li>Pâtes, riz, semoule, tapioca</li>
<li>Pain sans sel, biscottes spéciales</li>
<li>Produits hypoprotidiques spéciaux</li>
</ul>`,
  },
  {
    slug: "regime-hypoprotidique-conseils",
    titre: "Conseils pour bien réussir son régime hypoprotidique",
    description: "Astuces pratiques pour respecter votre restriction protidique au quotidien.",
    category: "Régime hypoprotidique",
    content: `<h2>Comment réduire les protéines sans se priver ?</h2>
<h3>Techniques culinaires</h3>
<ul>
<li>Utilisez des herbes et épices pour relever le goût</li>
<li>Optez pour des cuissons douces (vapeur, papillote)</li>
<li>Variez les textures et les présentations</li>
<li>Remplacez la viande par des légumes dans certains plats</li>
</ul>
<h3>Pièges à éviter</h3>
<ul>
<li>Ne pas réduire les calories totales (risque de dénutrition)</li>
<li>Ne pas supprimer toutes les protéines (seuil minimum 0.6 g/kg)</li>
<li>Consulter un diététicien spécialisé rénal</li>
</ul>
<h3>Suivi recommandé</h3>
<p>Contrôle nutritionnel tous les 3 mois avec bilan sanguin (albumine, préalbumine, protides totaux). Ajustement du régime si perte de poids ou dénutrition.</p>`,
  },
  // ── Régime contrôlé en potassium ──
  {
    slug: "regime-potassium-principes",
    titre: "Gérer son potassium au quotidien",
    description: "Comprendre l'hyperkaliémie et adapter son alimentation pour contrôler son potassium.",
    category: "Régime contrôlé en potassium",
    content: `<h2>Pourquoi contrôler le potassium ?</h2>
<p>En cas d'insuffisance rénale, l'élimination du potassium est réduite. Un excès (hyperkaliémie) peut provoquer des troubles du rythme cardiaque graves.</p>
<h3>Apport recommandé</h3>
<p>L'apport en potassium doit être limité à 2-3 g/jour en fonction du stade de la MRC et du taux sanguin.</p>
<h3>Techniques de cuisson pour réduire le potassium</h3>
<ul>
<li>Épluchez les légumes et coupez-les en petits morceaux</li>
<li>Faites-les tremper dans l'eau tiède 2h avant cuisson</li>
<li>Cuisez dans un grand volume d'eau (élimination du potassium)</li>
<li>Jetez l'eau de cuisson (ne pas réutiliser pour les sauces)</li>
</ul>`,
  },
  {
    slug: "regime-potassium-aliments",
    titre: "Aliments riches et pauvres en potassium",
    description: "Guide pratique des teneurs en potassium des aliments courants.",
    category: "Régime contrôlé en potassium",
    content: `<h2>Aliments très riches en potassium (à limiter)</h2>
<ul>
<li>Banane, kiwi, abricot, avocat, melon, fruit sec</li>
<li>Pomme de terre, patate douce, betterave</li>
<li>Épinards, chou vert, champignon, tomate cuite</li>
<li>Légumes secs (lentilles, pois chiches, haricots)</li>
<li>Chocolat, café soluble, thé fort</li>
<li>Sel de régime (riche en potassium)</li>
</ul>
<h2>Aliments pauvres en potassium (favorisés)</h2>
<ul>
<li>Pomme, poire, raisin, pastèque, ananas</li>
<li>Carotte, courgette, concombre, salade verte</li>
<li>Poivron, aubergine, oignon</li>
<li>Pâtes, riz, semoule (cuits, eau jetée)</li>
<li>Beurre, huile, sucre, confiture, miel</li>
</ul>`,
  },
  {
    slug: "regime-potassium-menus",
    titre: "Menus type pour régime contrôlé en potassium",
    description: "Idées de repas faibles en potassium pour la semaine.",
    category: "Régime contrôlé en potassium",
    content: `<h2>Menu pauvre en potassium</h2>
<p>Petit-déjeuner : Café filtre (pas de café soluble), pain blanc beurré, confiture de fraises, poire.</p>
<p>Déjeuner : Salade de concombre à la crème, filet de poulet grillé, riz blanc, haricots verts (cuits à l'eau), compote de pommes.</p>
<p>Dîner : Soupe de carottes (eau de cuisson jetée), omelette nature, pâtes, salade de laitue, fromage blanc (50g).</p>
<h2>Collations autorisées</h2>
<ul>
<li>Pomme ou poire</li>
<li>Petite poignée de raisins</li>
<li>Biscuits secs (type Petit Beurre)</li>
<li>Gélatine de fruits</li>
</ul>`,
  },
  // ── Régime contrôlé en phosphore ──
  {
    slug: "regime-phosphore-principes",
    titre: "Comprendre le rôle du phosphore dans la MRC",
    description: "Pourquoi contrôler le phosphore et comment réduire son apport alimentaire.",
    category: "Régime contrôlé en phosphore",
    content: `<h2>Le phosphore et les reins</h2>
<p>Quand les reins fonctionnent moins bien, le phosphore s'accumule dans le sang, ce qui peut fragiliser les os et calcifier les vaisseaux.</p>
<h3>Objectif</h3>
<p>Maintenir la phosphorémie entre 0.87 et 1.45 mmol/L (selon le stade de MRC).</p>
<h3>Règles d'or</h3>
<ul>
<li>Limiter les produits laitiers à 1 portion/jour</li>
<li>Éviter les fromages fondus et industriels</li>
<li>Préférer le fromage blanc au lait</li>
<li>Éviter les sodas type cola (riches en phosphore)</li>
<li>Prendre les chélateurs de phosphore prescrits avec les repas</li>
</ul>`,
  },
  {
    slug: "regime-phosphore-aliments",
    titre: "Aliments à limiter et à privilégier pour le phosphore",
    description: "Guide des aliments selon leur teneur en phosphore.",
    category: "Régime contrôlé en phosphore",
    content: `<h2>Aliments très riches en phosphore (à éviter)</h2>
<ul>
<li>Fromages fondus (Vache qui rit, Kiri, cancoillotte)</li>
<li>Fromages à pâte dure (Comté, Emmental, Parmesan)</li>
<li>Abats (rognons, foie, cervelle)</li>
<li>Poissons en conserve (sardines, maquereaux)</li>
<li>Œufs (le jaune surtout) — limiter à 3-4/semaine</li>
<li>Légumes secs, céréales complètes, fruits secs</li>
<li>Chocolat, cacao, soda cola, bière</li>
</ul>
<h2>Aliments pauvres en phosphore</h2>
<ul>
<li>Légumes frais, salade</li>
<li>Fruits frais, compotes</li>
<li>Viande maigre, volaille (100g/jour max)</li>
<li>Poisson frais (100g/jour max)</li>
<li>Beurre, crème, huiles végétales</li>
<li>Pain blanc, pâtes, riz, semoule raffinés</li>
<li>Sucre, miel, confiture, sirop</li>
</ul>`,
  },
  {
    slug: "regime-phosphore-chelateurs",
    titre: "Bien utiliser les chélateurs de phosphore",
    description: "Guide pratique pour l'utilisation des médicaments qui lient le phosphore alimentaire.",
    category: "Régime contrôlé en phosphore",
    content: `<h2>Qu'est-ce qu'un chélateur de phosphore ?</h2>
<p>Les chélateurs sont des médicaments qui se lient au phosphore des aliments dans l'intestin et empêchent son absorption. Ils doivent être pris obligatoirement au milieu des repas.</p>
<h3>Règles importantes</h3>
<ul>
<li>Prendre les chélateurs au milieu du repas, pas avant ni après</li>
<li>Les répartir selon l'importance du repas</li>
<li>Ne pas les prendre à jeun ou entre les repas</li>
<li>Les prendre à chaque repas contenant des protéines</li>
</ul>
<h3>Types de chélateurs</h3>
<ul>
<li>Carbonate de calcium : apporte du calcium, à prendre avec les repas</li>
<li>Sévélamer : n'apporte pas de calcium, pour les patients hypercalcémiques</li>
<li>Lanthane : très efficace, à mâcher pendant le repas</li>
</ul>`,
  },
  // ── Régime pour dialyse ──
  {
    slug: "regime-dialyse-principes",
    titre: "Alimentation pendant la dialyse",
    description: "Principes nutritionnels pour les patients sous hémodialyse ou dialyse péritonéale.",
    category: "Régime pour dialyse",
    content: `<h2>Objectifs nutritionnels en dialyse</h2>
<p>L'alimentation des patients dialysés doit compenser les pertes nutritionnelles tout en contrôlant les électrolytes.</p>
<h3>Hémodialyse</h3>
<ul>
<li>Protéines : 1.2 g/kg/jour (pertes importantes pendant la séance)</li>
<li>Sodium : < 2g/jour (contrôle de la soif et de la prise de poids)</li>
<li>Potassium : 2-3 g/jour (variable selon le taux sanguin)</li>
<li>Phosphore : < 1g/jour</li>
<li>Calories : 30-35 kcal/kg/jour</li>
</ul>
<h3>Dialyse péritonéale</h3>
<ul>
<li>Protéines : 1.2-1.5 g/kg/jour (pertes plus importantes)</li>
<li>Apport calorique réduit si diabète ou surpoids</li>
<li>Potassium moins restrictif (élimination meilleure)</li>
<li>Limiter les sucres rapides (apport glucose via le dialysat)</li>
</ul>`,
  },
  {
    slug: "regime-dialyse-conseils",
    titre: "Conseils pratiques pour gérer les repas en dialyse",
    description: "Astuces pour mieux vivre son régime alimentaire pendant la dialyse.",
    category: "Régime pour dialyse",
    content: `<h2>Gérer la soif</h2>
<ul>
<li>Limiter l'apport en sel pour réduire la soif</li>
<li>Sucer un glaçon, un morceau de citron congelé</li>
<li>Mâcher du chewing-gum sans sucre</li>
<li>Se rincer la bouche à l'eau froide sans avaler</li>
<li>Répartir la boisson autorisée sur la journée</li>
</ul>
<h2>Avant la séance de dialyse</h2>
<ul>
<li>Manger un repas léger 1-2h avant</li>
<li>Éviter les aliments riches en potassium</li>
<li>Limiter les boissons</li>
</ul>
<h2>Pendant la séance</h2>
<p>Un goûter protéiné peut être proposé pendant la séance pour compenser les pertes. Parlez-en à votre équipe soignante.</p>`,
  },
  {
    slug: "regime-dialyse-menus",
    titre: "Menus adaptés pour patients dialysés",
    description: "Idées de repas équilibrés pour les patients sous dialyse.",
    category: "Régime pour dialyse",
    content: `<h2>Menu type hémodialyse (jour de dialyse)</h2>
<p>Petit-déjeuner : Tisane, pain blanc (30g), beurre, confiture, œuf dur.</p>
<p>Déjeuner : Betteraves râpées, escalope de dinde (100g), riz blanc, carottes cuites, yaourt nature (50g).</p>
<p>Goûter (pendant dialyse) : Biscottes (2), pâté de campagne (30g).</p>
<p>Dîner : Potage de légumes (eau de cuisson jetée), poisson blanc vapeur (80g), purée de pommes de terre (maison), fruit poché.</p>
<h2>Collations</h2>
<ul>
<li>Pomme cuite</li>
<li>Fromage blanc (50g)</li>
<li>Biscuits secs</li>
<li>Gelée de fruits</li>
</ul>`,
  },
  // ── Régime post-transplantation ──
  {
    slug: "regime-post-transplant-principes",
    titre: "Nutrition après transplantation rénale",
    description: "Les bases de l'alimentation pour protéger votre greffon et prévenir les complications.",
    category: "Régime post-transplantation",
    content: `<h2>Objectifs nutritionnels</h2>
<p>Après une transplantation rénale, l'alimentation vise à prévenir les complications liées aux immunosuppresseurs et à maintenir un bon état nutritionnel.</p>
<h3>Période post-opératoire (0-3 mois)</h3>
<ul>
<li>Protéines : 1.2-1.5 g/kg/jour (cicatrisation)</li>
<li>Apport calorique élevé pour compenser l'hypercatabolisme</li>
<li>Hydratation abondante (2-3L/jour)</li>
<li>Éviter les aliments crus (risque infectieux)</li>
</ul>
<h3>Période de suivi (3-12 mois)</h3>
<ul>
<li>Protéines : 1-1.2 g/kg/jour</li>
<li>Contrôle du poids (corticoïdes augmentent l'appétit)</li>
<li>Sodium : < 3g/jour (contrôle HTA)</li>
<li>Sucres : limiter (risque de diabète post-greffe)</li>
</ul>`,
  },
  {
    slug: "regime-post-transplant-aliments",
    titre: "Aliments recommandés et à éviter après greffe",
    description: "Guide alimentaire complet pour la période post-transplantation.",
    category: "Régime post-transplantation",
    content: `<h2>Aliments à privilégier</h2>
<ul>
<li>Fruits et légumes cuits ou bien lavés</li>
<li>Viandes et poissons cuits à cœur</li>
<li>Produits laitiers pasteurisés</li>
<li>Œufs cuits (bien cuits, pas à la coque)</li>
<li>Eau en bouteille ou filtrée</li>
<li>Huile d'olive, colza, noix</li>
</ul>
<h2>Aliments à éviter</h2>
<ul>
<li>Fruits de mer crus, sushi, tarama</li>
<li>Fromages au lait cru</li>
<li>Viande crue ou saignante (steak tartare)</li>
<li>Œufs crus ou à la coque</li>
<li>Eau du robinet non filtrée</li>
<li>Pamplemousse (interagit avec les immunosuppresseurs)</li>
</ul>
<h2>Interactions médicamenteuses</h2>
<p>Le pamplemousse et le millepertuis sont formellement contre-indiqués car ils modifient le métabolisme des immunosuppresseurs (ciclosporine, tacrolimus).</p>`,
  },
  {
    slug: "regime-post-transplant-menus",
    titre: "Menus type pour patients transplantés",
    description: "Exemples de repas équilibrés pour la période post-greffe.",
    category: "Régime post-transplantation",
    content: `<h2>Menu type — Phase de suivi</h2>
<p>Petit-déjeuner : Café au lait pasteurisé, pain complet (40g), beurre, confiture, kiwi.</p>
<p>Déjeuner : Salade de carottes râpées (vinaigrette maison), filet de saumon cuit à cœur (120g), riz complet, haricots verts, yaourt pasteurisé.</p>
<p>Dîner : Potage de légumes maison, blanc de poulet grillé (100g), quinoa, courgettes sautées, compote de pommes.</p>
<h2>Hydratation</h2>
<p>Bien répartir la boisson sur la journée : 1 verre d'eau toutes les 2 heures. Éviter de boire pendant les repas (favoriser entre les repas).</p>`,
  },
  // ── Régime pour lithiase urinaire ──
  {
    slug: "regime-lithiase-principes",
    titre: "Prévenir les calculs rénaux par l'alimentation",
    description: "Principes nutritionnels pour réduire le risque de récidive des lithiases urinaires.",
    category: "Régime pour lithiase urinaire",
    content: `<h2>Comprendre les calculs rénaux</h2>
<p>Les lithiases urinaires sont des cristaux qui se forment dans les reins. Leur composition détermine les mesures diététiques à appliquer.</p>
<h3>Règles générales</h3>
<ul>
<li>Hydratation : 2.5-3L d'eau par jour (diluée les urines)</li>
<li>Répartition de la boisson sur toute la journée</li>
<li>Boire un verre d'eau au coucher et pendant la nuit</li>
<li>Réduire le sel (favorise les calculs calciques)</li>
<li>Apport calcique normal (ne pas supprimer le calcium)</li>
</ul>
<h3>Type de calcul</h3>
<p>Le régime dépend du type de calcul : oxalate de calcium, phosphate de calcium, acide urique, cystine. Un bilan métabolique complet est nécessaire.</p>`,
  },
  {
    slug: "regime-lithiase-oxalate",
    titre: "Régime pour lithiase oxalocalcique",
    description: "Conseils alimentaires spécifiques pour les calculs d'oxalate de calcium.",
    category: "Régime pour lithiase urinaire",
    content: `<h2>Calculs d'oxalate de calcium</h2>
<p>C'est le type de calcul le plus fréquent (70% des cas). L'alimentation vise à réduire l'oxalate et maintenir un calcium normal.</p>
<h3>Aliments riches en oxalate (à limiter)</h3>
<ul>
<li>Épinards, rhubarbe, betterave, blette</li>
<li>Chocolat, cacao, noix, amandes, cacahuètes</li>
<li>Thé noir, café soluble</li>
<li>Fruits secs, figues sèches</li>
<li>Son de blé, germe de blé</li>
</ul>
<h3>Conseils</h3>
<ul>
<li>Ne pas supprimer le calcium (important pour lier l'oxalate)</li>
<li>Consommer calcium et oxalate au même repas (ils se lient dans l'intestin)</li>
<li>Boire du jus de citron (citrate inhibe la cristallisation)</li>
<li>Limiter la vitamine C à 500mg/jour (se transforme en oxalate)</li>
</ul>`,
  },
  {
    slug: "regime-lithiase-urique",
    titre: "Régime pour lithiase urique",
    description: "Conseils alimentaires pour les calculs d'acide urique (goutte rénale).",
    category: "Régime pour lithiase urinaire",
    content: `<h2>Calculs d'acide urique</h2>
<p>Ces calculs surviennent souvent chez les patients ayant un taux élevé d'acide urique (hyperuricémie) ou des urines acides.</p>
<h3>Aliments riches en purines (à limiter)</h3>
<ul>
<li>Abats (rognons, foie, cervelle, ris de veau)</li>
<li>Gibier, viandes grasses</li>
<li>Sardines, anchois, maquereau</li>
<li>Fruits de mer, crustacés</li>
<li>Bouillon de viande, extrait de viande</li>
<li>Bière et alcool (surtout la bière)</li>
</ul>
<h3>Alcalinisation des urines</h3>
<p>Des urines plus alcalines dissolvent mieux l'acide urique :</p>
<ul>
<li>Eaux bicarbonatées (Vichy, Saint-Yorre)</li>
<li>Jus de citron (citrate de potassium)</li>
<li>Fruits et légumes frais (effet alcalinisant)</li>
<li>Éviter les protéines animales en excès</li>
</ul>`,
  },
  // ── Régime pour diabétique ──
  {
    slug: "regime-diabetique-principes",
    titre: "Alimentation équilibrée du diabétique avec atteinte rénale",
    description: "Concilier équilibre glycémique et protection rénale.",
    category: "Régime pour diabétique",
    content: `<h2>Objectifs du régime</h2>
<p>Le patient diabétique avec atteinte rénale doit contrôler sa glycémie tout en protégeant ses reins. Les deux objectifs sont complémentaires.</p>
<h3>Objectifs glycémiques</h3>
<ul>
<li>HbA1c < 7% (ou < 7.5% selon l'âge et les comorbidités)</li>
<li>Glycémie à jeun : 0.80-1.20 g/L</li>
<li>Glycémie post-prandiale : < 1.60 g/L</li>
</ul>
<h3>Principes alimentaires</h3>
<ul>
<li>Répartition des glucides sur 3 repas et 2-3 collations</li>
<li>Index glycémique bas à modéré</li>
<li>Protéines : 0.8-1 g/kg/jour (selon stade MRC)</li>
<li>Sodium : < 2g/jour (prévention HTA)</li>
<li>Fibres : 25-30g/jour</li>
</ul>`,
  },
  {
    slug: "regime-diabetique-aliments",
    titre: "Choix alimentaires pour diabétique néphropathe",
    description: "Guide des aliments adaptés pour contrôler la glycémie et préserver les reins.",
    category: "Régime pour diabétique",
    content: `<h2>Glucides à privilégier (IG bas)</h2>
<ul>
<li>Pain complet, pain de seigle</li>
<li>Pâtes al dente, riz basmati, quinoa</li>
<li>Légumineuses (lentilles, pois chiches) en quantité modérée</li>
<li>Fruits frais (sauf banane, raisin, figue en excès)</li>
<li>Flocons d'avoine, son d'avoine</li>
</ul>
<h2>Glucides à limiter (IG élevé)</h2>
<ul>
<li>Soda, jus de fruits industriels</li>
<li>Pain blanc, viennoiseries, biscuits</li>
<li>Pommes de terre (surtout frites, purée)</li>
<li>Riz à cuisson rapide, corn-flakes</li>
<li>Confiture, miel, sucre blanc</li>
</ul>
<h2>Édulcorants autorisés</h2>
<p>L'aspartame, le sucralose et l'acésulfame K sont autorisés en quantité modérée. Éviter la stévia en cas d'hypotension.</p>`,
  },
  {
    slug: "regime-diabetique-menus",
    titre: "Menus pour diabétique avec néphropathie",
    description: "Exemples de repas équilibrés pour la semaine.",
    category: "Régime pour diabétique",
    content: `<h2>Menu type — Jour 1</h2>
<p>Petit-déjeuner : Thé vert sans sucre, pain complet (30g), fromage blanc 0% (80g), 1/2 pomme.</p>
<p>Collation : 1 poignée d'amandes (30g).</p>
<p>Déjeuner : Salade de mâche au citron, filet de colin (120g), riz basmati (150g cuit), courgettes vapeur, yaourt nature (sans sucre).</p>
<p>Collation : 1 kiwi.</p>
<p>Dîner : Soupe de légumes maison, escalope de poulet (100g), haricots verts, flan aux œufs sans sucre.</p>
<h2>Menu type — Jour 2</h2>
<p>Petit-déjeuner : Café, 2 biscottes complètes, beurre, 1 œuf à la coque.</p>
<p>Déjeuner : Carottes râpées, daurade grillée (120g), quinoa (150g cuit), épinards vapeur, compote sans sucre ajouté.</p>
<p>Dîner : Potage de potiron, cabillaud au four, brocolis, fromage blanc (80g).</p>`,
  },
]

export default plans

export function getPlansByCategory(category: string): DietPlanEntry[] {
  return plans.filter((p) => p.category === category)
}

export function getPlanBySlug(slug: string): DietPlanEntry | undefined {
  return plans.find((p) => p.slug === slug)
}

export function getAllCategories(): string[] {
  return [...new Set(plans.map((p) => p.category))]
}
