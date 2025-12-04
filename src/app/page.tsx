"use client";

import { useState, useEffect } from "react";
import { CreditCard, Shield, Clock, ChevronDown, X, Check, Circle } from "lucide-react";

type Institution = "nubank" | "will" | "inter" | "picpay" | null;
type PaymentMethod = "credit" | "pix" | null;

interface PlanData {
  from: string;
  to: string;
  price: string;
  priceValue: number;
  cardHolder: string;
  featured?: boolean;
}

export default function Home() {

  // Estados principais
  const [timeLeft, setTimeLeft] = useState(600);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);

  // Form
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(null);
  const [cpf, setCpf] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDigit, setAccountDigit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 600 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  // Dados dos planos
  const plans: PlanData[] = [
    {
      from: "R$1.000",
      to: "R$2.000",
      price: "R$27,99",
      priceValue: 27.99,
      cardHolder: "João Martins",
    },
    {
      from: "R$2.000",
      to: "R$5.000",
      price: "R$56,99",
      priceValue: 56.99,
      featured: true,
      cardHolder: "Maria Silva",
    },
    {
      from: "R$5.000",
      to: "R$10.000",
      price: "R$86,99",
      priceValue: 86.99,
      cardHolder: "Carlos Santos",
    },
  ];

  const institutions = [
    { id: "nubank", name: "Nubank", color: "bg-[#820AD1]", icon: "N" },
    { id: "will", name: "Will Bank", color: "bg-[#FFD700]", icon: "W" },
    { id: "inter", name: "Inter", color: "bg-[#FF7A00]", icon: "I" },
    { id: "picpay", name: "PicPay", color: "bg-[#21C25E]", icon: "P" },
  ];

  const handlePlanClick = (plan: PlanData) => {
    setSelectedPlan(plan);
    setShowModal(true);
    setCurrentStep(1);

    setSelectedInstitution(null);
    setCpf("");
    setAccountNumber("");
    setAccountDigit("");
    setPaymentMethod(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStep(1);
    setSelectedPlan(null);
  };

  const handleNextStep = () => {
    const cpfValid = cpf.replace(/\D/g, "").length === 11;
    if (currentStep === 1 && selectedInstitution) setCurrentStep(2);
    else if (currentStep === 2 && cpfValid && accountNumber && accountDigit) setCurrentStep(3);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinalizePurchase = () => {
    if (!selectedPlan || !paymentMethod) return;

    let checkout = "";

    if (selectedPlan.priceValue === 27.99) checkout = "https://go.perfectpay.com.br/PPU38CQ46PJ";
    if (selectedPlan.priceValue === 56.99) checkout = "https://go.perfectpay.com.br/PPU38CQ46PT";
    if (selectedPlan.priceValue === 86.99) checkout = "https://go.perfectpay.com.br/PPU38CQ46Q2";

    window.location.href = checkout;
  };  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#820AD1] to-[#A855F7] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg w-12 h-12 flex items-center justify-center">
                <span className="text-[#820AD1] font-black text-3xl italic">N</span>
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Limite Plus</h1>
                <p className="text-sm md:text-base text-purple-100 mt-1">
                  Consultoria para aumento de limite em bancos digitais
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base">
              <a href="#inicio" className="hover:text-purple-200 transition-colors">Início</a>
              <a href="#planos" className="hover:text-purple-200 transition-colors">Planos</a>
              <a href="#como-funciona" className="hover:text-purple-200 transition-colors">Como Funciona</a>
              <a href="#contato" className="hover:text-purple-200 transition-colors">Contato</a>
            </nav>

          </div>
        </div>
      </header>

      {/* BANNER TIMER */}
      <div className="bg-[#6B21A8] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">
                ⚡ Oferta por tempo limitado! Termina em:
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold tabular-nums">
                {formatTime(timeLeft)}
              </span>

              <button
                onClick={scrollToPlans}
                className="bg-[#FACC15] hover:bg-[#EAB308] text-[#6B21A8] font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                Garantir Agora
              </button>
            </div>

          </div>
        </div>
      </div>  {/* HERO */}
      <section
        id="inicio"
        className="bg-gradient-to-br from-[#820AD1] via-[#9333EA] to-[#A855F7] text-white py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Aumente seu limite bancário com segurança e rapidez 💳
              </h2>
              <p className="text-lg md:text-xl text-purple-100 mb-8">
                Processo online, simples e autorizado.
              </p>

              <button
                onClick={scrollToPlans}
                className="bg-white text-[#820AD1] hover:bg-purple-50 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Ver Planos Disponíveis
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl"></div>

                <div className="relative bg-gradient-to-br from-[#6B21A8] to-[#9333EA] rounded-3xl p-8 shadow-2xl w-full max-w-md aspect-[1.586/1]">
                  <div className="h-full flex flex-col justify-between">

                    <div className="flex justify-between items-start">
                      <div className="bg-white rounded-lg w-14 h-14 flex items-center justify-center">
                        <span className="text-[#820AD1] font-black text-4xl italic">N</span>
                      </div>
                      <CreditCard className="w-12 h-12 text-white/40" />
                    </div>

                    <div className="w-14 h-11 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg"></div>

                    <div className="space-y-2">
                      <p className="text-white/70 text-xs uppercase tracking-wider">Titular</p>
                      <p className="text-white text-xl font-bold tracking-wide">Ana Paula Costa</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-center mt-12">
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Escolha seu Plano de Aumento
            </h2>
            <p className="text-lg text-gray-600">
              Selecione o plano ideal para o seu limite atual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.featured ? "ring-4 ring-[#820AD1]" : ""
                }`}
              >
                {plan.featured && (
                  <div className="bg-[#820AD1] text-white text-center py-2 font-bold text-sm">
                    MAIS POPULAR
                  </div>
                )}

                <div className="p-8">

                  <div className="bg-gradient-to-br from-[#820AD1] to-[#A855F7] rounded-xl p-6 mb-6 aspect-[1.586/1] flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="bg-white rounded-md w-10 h-10 flex items-center justify-center">
                        <span className="text-[#820AD1] font-black text-2xl italic">N</span>
                      </div>

                      <CreditCard className="w-8 h-8 text-white/40" />
                    </div>

                    <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md"></div>

                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Titular</p>
                      <p className="text-white text-base font-bold tracking-wide">
                        {plan.cardHolder}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    {plan.from} → {plan.to}
                  </h3>

                  <div className="text-center my-6">
                    <span className="text-4xl font-bold text-[#820AD1]">
                      {plan.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePlanClick(plan)}
                    className="block w-full bg-gradient-to-r from-[#820AD1] to-[#A855F7] hover:from-[#6B21A8] hover:to-[#9333EA] text-white font-bold py-4 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
                  >
                    Comprar Agora
                  </button>

                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg">
              <Shield className="w-6 h-6 text-[#820AD1]" />
              <p className="text-gray-700 font-medium">
                Tudo feito de forma segura e com análise de crédito responsável.
              </p>
            </div>
          </div>

        </div>
      </section> {/* MODAL */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-fadeIn">

            {/* CLOSE */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* HEADER */}
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Finalizar Solicitação
            </h2>
            <p className="text-gray-600 mb-6">
              Plano selecionado: <strong>{selectedPlan.price}</strong>
            </p>

            {/* STEPS */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 mx-1 rounded-full ${
                    currentStep >= step ? "bg-[#820AD1]" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Selecione seu banco</h3>

                <div className="grid grid-cols-2 gap-4">
                  {institutions.map((inst) => (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedInstitution(inst.id)}
                      className={`p-4 rounded-xl flex flex-col items-center justify-center gap-3 border transition-all ${
                        selectedInstitution === inst.id
                          ? "border-[#820AD1] bg-purple-50"
                          : "border-gray-300"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${inst.color}`}>
                        {inst.icon}
                      </div>
                      <span className="text-gray-900">{inst.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  disabled={!selectedInstitution}
                  onClick={handleNextStep}
                  className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all ${
                    selectedInstitution
                      ? "bg-[#820AD1] hover:bg-[#6B21A8]"
                      : "bg-gray-400"
                  }`}
                >
                  Continuar
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados da conta</h3>

                <div className="space-y-4">
                  <input
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    maxLength={14}
                    placeholder="CPF"
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Número da conta"
                    className="w-full border p-3 rounded-xl"
                  />

                  <input
                    value={accountDigit}
                    onChange={(e) => setAccountDigit(e.target.value)}
                    placeholder="Dígito"
                    className="w-full border p-3 rounded-xl"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-3 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300"
                  >
                    Voltar
                  </button>

                  <button
                    disabled={!cpf || !accountNumber || !accountDigit}
                    onClick={handleNextStep}
                    className={`px-6 py-3 rounded-xl font-bold text-white ${
                      cpf && accountNumber && accountDigit
                        ? "bg-[#820AD1] hover:bg-[#6B21A8]"
                        : "bg-gray-400"
                    }`}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Método de pagamento</h3>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
                      paymentMethod === "pix" ? "border-[#820AD1] bg-purple-50" : "border-gray-300"
                    }`}
                  >
                    <Circle className="w-6 h-6" />
                    PIX
                  </button>

                  <button
                    onClick={() => setPaymentMethod("credit")}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
                      paymentMethod === "credit" ? "border-[#820AD1] bg-purple-50" : "border-gray-300"
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    Cartão
                  </button>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-3 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300"
                  >
                    Voltar
                  </button>

                  <a
                    href={
                      selectedPlan.priceValue === 27.99
                        ? "https://go.perfectpay.com.br/PPU38CQ46PJ"
                        : selectedPlan.priceValue === 56.99
                        ? "https://go.perfectpay.com.br/PPU38CQ46PT"
                        : "https://go.perfectpay.com.br/PPU38CQ46Q2"
                    }
                    className={`px-6 py-3 rounded-xl font-bold text-white ${
                      paymentMethod
                        ? "bg-[#16A34A] hover:bg-[#15803D]"
                        : "bg-gray-400 pointer-events-none"
                    }`}
                  >
                    Finalizar
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center mt-16">
        <p className="text-sm">© 2025 Limite Plus. Todos os direitos reservados.</p>
        <p className="text-xs mt-2 opacity-60">Nenhuma ação bancária é realizada sem permissão do cliente.</p>
      </footer>

    </div>
  );
}
        

        
