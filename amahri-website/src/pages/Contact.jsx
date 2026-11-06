import { useState } from 'react';
import { PageHero } from '../components/Products';

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  function change(e) { setFields((prev) => ({ ...prev, [e.target.name]: e.target.value })); }
  function submit(e) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const body = `Nom : ${fields.name.trim()}\nEmail : ${fields.email.trim()}\n\n${fields.message.trim()}`;
    window.location.href = `mailto:ayoubamahri2001@gmail.com?subject=${encodeURIComponent('[AMAHRI] ' + fields.subject.trim())}&body=${encodeURIComponent(body)}`;
  }
  return <>
    <PageHero eyebrow="Restons en contact" title="Contactez-nous" description="Une question sur un parfum, un format ou une livraison ? Nous sommes à votre écoute." />
    <div className="container contact-layout">
      <div className="contact-side"><h2>Parlons parfums.</h2><p className="contact-intro">Besoin d’un conseil pour choisir votre fragrance ? Contactez-nous via WhatsApp ou par e-mail.</p>
        <div className="contact-method"><strong>WhatsApp / Téléphone</strong><a href="https://wa.me/212609180234" target="_blank" rel="noopener noreferrer">06 09 18 02 34</a></div>
        <div className="contact-method"><strong>E-mail</strong><a href="mailto:ayoubamahri2001@gmail.com">ayoubamahri2001@gmail.com</a></div>
        <div className="contact-method"><strong>Livraison</strong><span>Disponible au Maroc — détails à confirmer</span></div>
        <a className="button button-dark" href="https://wa.me/212609180234" target="_blank" rel="noopener noreferrer">Discuter sur WhatsApp ↗</a>
      </div>
      <form className="form-panel" onSubmit={submit}>
        <h2 className="panel-heading">Écrivez-nous</h2>
        <div className="field"><label htmlFor="contact-name">Nom *</label><input id="contact-name" name="name" value={fields.name} onChange={change} required maxLength={100}/></div>
        <div className="field"><label htmlFor="contact-email">E-mail *</label><input id="contact-email" name="email" type="email" autoComplete="email" value={fields.email} onChange={change} required maxLength={150}/></div>
        <div className="field"><label htmlFor="contact-subject">Sujet *</label><input id="contact-subject" name="subject" value={fields.subject} onChange={change} required maxLength={100}/></div>
        <div className="field"><label htmlFor="contact-message">Message *</label><textarea id="contact-message" name="message" value={fields.message} onChange={change} required maxLength={3000}/></div>
        <button className="button button-dark button-block" type="submit">Envoyer par e-mail ↗</button>
        <p className="form-help">Le formulaire ouvrira votre application de messagerie. Aucun message n’est envoyé directement par un serveur.</p>
      </form>
    </div>
  </>;
}
