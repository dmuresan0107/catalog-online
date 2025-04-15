# Catalog Online - Aplicație Web pentru Note Studenți

Această aplicație este un sistem simplu de tip "catalog online", care permite autentificarea utilizatorilor și gestionarea notelor studenților. Este dezvoltată pentru un proiect universitar și integrează Firebase pentru autentificare și stocare date.

---

## 🔧 Funcționalități implementate

- ✅ Login cu email și parolă (Firebase Auth)
- ✅ Alegerea rolului la autentificare (student / profesor)
- ✅ Salvare automată a utilizatorului în Firestore
- ✅ Profesori:
  - pot adăuga note pentru studenți
  - pot vedea toate notele
  - pot șterge note
- ✅ Studenți:
  - pot vedea doar notele proprii
- ✅ Logout
- ✅ Design responsive și modern (Tailwind CSS)

---

## 🧰 Tehnologii folosite

- React 18 (Vite)
- Firebase (Authentication + Firestore)
- Tailwind CSS 3
- PostCSS + Autoprefixer

---

## 🖥️ Cum rulezi local

1. Clonează proiectul sau extrage arhiva
2. Rulează:

```bash
npm install
npm run dev