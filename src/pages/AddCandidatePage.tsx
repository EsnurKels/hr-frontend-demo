import React, { useState } from "react";

export default function AddCandidatePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [gpa, setGpa] = useState("");
  const [about, setAbout] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Telefon formatı
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const formatted = digits
      .replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4")
      .replace(/^(\d{3})(\d{3})(\d{2})$/, "$1 $2 $3")
      .replace(/^(\d{3})(\d{3})$/, "$1 $2")
      .replace(/^(\d{3})$/, "$1");
    setPhone(formatted);
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleGithubChange = (value: string) => {
    const cleaned = value
      .replace("https://github.com/", "")
      .replace("github.com/", "")
      .replace(/\//g, "");
    setGithub(cleaned);
  }

  const handleLinkedinChange = (value: string) => {
    const cleaned = value
      .replace("https://linkedin.com/in/", "")
      .replace("linkedin.com/in/", "")
      .replace(/\//g, "");
    setLinkedin(cleaned);
  };

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!firstName || !lastName || !phone || !email) {
      return setMessage("Lütfen tüm zorunlu alanları doldurun.");
    }

    if (!validateEmail(email)) {
      return setMessage("Lütfen geçerli bir e-posta adresi girin.");
    }

    try {
      // Bilgileri kontrol ediyorum
      const res = await fetch("http://localhost:3000/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          github: github ? `https://github.com/${github}` : "",
          linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : "",
          educationLevel,
          schoolName,
          gpa,
          about,
        }),
      });

      if(!res.ok) {
        // backend sonucu oluşsuzsa
        const err = await res.json().catch(() => ({}));
        showToast(`${err.error || "Aday eklenemedi"}`, false);
        return;
      }

      const newCandidate = await res.json();

      // 2️⃣ CV dosyası varsa yükle
      if (cv && newCandidate.id) {
        const formData = new FormData();
        formData.append("cv", cv);

        await fetch(`http://localhost:3000/upload-cv/${newCandidate.id}`, {
          method: "POST",
          body: formData,
        });
      }

      showToast("Aday başarıyla eklendi ✅", true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setGithub("");
      setLinkedin("");
      setEducationLevel("");
      setSchoolName("");
      setGpa("");
      setAbout("")
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      showToast("Aday eklenirken bir hata oluştu ❌", false);
    }
  };

  // Uyarı Mesajları (Toast)
  const showToast = (msg: string, success: boolean) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => setMessage(""), 3000); // 3 saniye sonra kaybolur
  };

  return (
    <>
      {/* Toast */}
        {message && (
          <div
            className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-lg shadow-lg text-white text-sm font-medium transform transition-all duration-300 ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            } animate-slide-in`}
          >
            {message}
          </div>
        )}
      <div className="bg-white shadow rounded-lg p-6 max-w-xxl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Yeni Aday Ekle</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Ad</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                placeholder="Adınızı Giriniz"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Soyad</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                placeholder="Soyadınızı Giriniz"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Telefon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="5xx xxx xx xx"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                placeholder="E-posta giriniz"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">GitHub</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <span className="text-gray-500 select-none">https://github.com/</span>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => handleGithubChange(e.target.value)}
                  placeholder="kullanici"
                  className="flex-1 outline-none ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">LinkedIn</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <span className="text-gray-500 select-none">https://linkedin.com/in/</span>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => handleLinkedinChange(e.target.value)}
                  placeholder="kullanici"
                  className="flex-1 outline-none ml-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Eğitim Seviyesi</label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500">
                <option value="">Seçiniz</option>
                <option value="İlkokul">İlkokul</option>
                <option value="Ortaokul">Ortaokul</option>
                <option value="Lise">Lise</option>
                <option value="Üniversite">Üniversite</option>
                <option value="Yüksek Lisans">Yüksek Lisans</option>
                <option value="Doktora">Doktora</option>
              </select>
            </div>

            {educationLevel && (
              <>
                <div>
                  <label className="block text-gray-700 mb-1">Okul Adı</label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                    placeholder="Okul Adınızı Giriniz"
                  />
                </div>

                {["Lise", "Üniversite", "Yüksek Lisans", "Doktora"].includes(
                  educationLevel
                ) && (
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Mezuniyet Ortalaması
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                        placeholder="Örn: 3.25, 84.5"
                      />
                    </div>
                  )}
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Hakkında</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                placeholder="Kendinizi kısaca tanıtın..."
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">CV (PDF / Word)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <button type="submit"
            className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-700 transition">
            Kaydet
          </button>
        </form>
      </div>
    </>
  );
}
