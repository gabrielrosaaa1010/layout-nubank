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
  const [timeLeft, setTimeLeft] = useState(600);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  
  // Form data
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(null);
  const [cpf, setCpf] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDigit, setAccountDigit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 600;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return cpf;
  };

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

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
    { 
      id: "nubank" as const, 
      name: "Nubank", 
      color: "bg-[#820AD1]",
      icon: "N"
    },
    { 
      id: "will" as const, 
      name: "Will Bank", 
      color: "bg-[#FFD700]",
      icon: "W"
    },
    { 
      id: "inter" as const, 
      name: "Inter", 
      color: "bg-[#FF7A00]",
      icon: "I"
    },
    { 
      id: "picpay" as const, 
      name: "PicPay", 
      color: "bg-[#21C25E]",
      icon: "P"
    },
  ];

  const handlePlanClick = (plan: PlanData) => {
    setSelectedPlan(plan);
    setShowModal(true);
    setCurrentStep(1);
    // Reset form
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
    if (currentStep === 1 && selectedInstitution) {
      setCurrentStep(2);
    } else if (currentStep === 2 && cpf && accountNumber && accountDigit) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalizePurchase = () => {
  const selectedValue = selectedRange || selectedPrice;

  if (!selectedValue) return;

  let checkoutUrl = "";

  switch (selectedValue) {
    case "1000-2000":
    case 1000:
      checkoutUrl = "https://go.perfectpay.com.br/PPU38CQ46PJ";
      break;

    case "2000-5000":
    case 2000:
      checkoutUrl = "https://go.perfectpay.com.br/PPU38CQ46PT";
      break;

    case "5000-10000":
    case 5000:
      checkoutUrl = "https://go.perfectpay.com.br/PPU38CQ46Q2";
      break;

    default:
      return;
  }

  window.location.href = checkoutUrl;
};
  };

  const canProceedStep1 = selectedInstitution !== null;
  const canProceedStep2 = cpf.replace(/\D/g, "").length === 11 && accountNumber && accountDigit;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <a href="#inicio" className="hover:text-purple-200 transition-colors">
                Início
              </a>
              <a href="#planos" className="hover:text-purple-200 transition-colors">
                Planos
              </a>
              <a href="#como-funciona" className="hover:text-purple-200 transition-colors">
                Como Funciona
              </a>
              <a href="#contato" className="hover:text-purple-200 transition-colors">
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Timer Banner */}
      <div className="bg-[#6B21A8] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">
                ⚡ Oferta por tempo limitado! Finaliza em:
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
      </div>

      {/* Hero Section */}
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

      {/* Plans Section */}
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
                      <p className="text-white text-base font-bold tracking-wide">{plan.cardHolder}</p>
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
      </section>

      {/* Modal de Checkout */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-gradient-to-r from-[#820AD1] to-[#A855F7] text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Finalizar Compra</h3>
                <p className="text-purple-100 text-sm mt-1">
                  Plano: {selectedPlan.from} → {selectedPlan.to}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 1
                        ? "bg-[#820AD1] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">Instituição</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-[#820AD1]" : "bg-gray-200"}`}></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 2
                        ? "bg-[#820AD1] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > 2 ? <Check className="w-5 h-5" /> : "2"}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">Dados</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-[#820AD1]" : "bg-gray-200"}`}></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 3
                        ? "bg-[#820AD1] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-xs mt-2 text-gray-600">Pagamento</span>
                </div>
              </div>
            </div>

            {/* Step 1: Seleção de Instituição */}
            {currentStep === 1 && (
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Escolha sua instituição financeira
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {institutions.map((institution) => (
                    <button
                      key={institution.id}
                      onClick={() => setSelectedInstitution(institution.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedInstitution === institution.id
                          ? "border-[#820AD1] bg-purple-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl ${institution.color} mb-3 mx-auto flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-black text-3xl">{institution.icon}</span>
                      </div>
                      <p className="font-bold text-gray-900 text-lg">{institution.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Dados da Conta */}
            {currentStep === 2 && (
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Informe os dados da sua conta
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#820AD1] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número da Conta
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#820AD1] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dígito
                      </label>
                      <input
                        type="text"
                        value={accountDigit}
                        onChange={(e) => setAccountDigit(e.target.value.replace(/\D/g, ""))}
                        placeholder="0"
                        maxLength={1}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#820AD1] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pagamento */}
            {currentStep === 3 && (
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Pagamento Seguro via Perfect Pay
                </h4>
                
                {/* Resumo do Pedido */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h5 className="font-bold text-gray-900 mb-3">Resumo do Pedido</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plano:</span>
                      <span className="font-medium">{selectedPlan.from} → {selectedPlan.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instituição:</span>
                      <span className="font-medium capitalize">{selectedInstitution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPF:</span>
                      <span className="font-medium">{cpf}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conta:</span>
                      <span className="font-medium">{accountNumber}-{accountDigit}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="font-bold text-[#820AD1] text-lg">{selectedPlan.price}</span>
                    </div>
                  </div>
                </div>

                {/* Seleção de Método de Pagamento */}
                <div className="mb-6">
                  <h5 className="font-bold text-gray-900 mb-3">Escolha o método de pagamento</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("credit")}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === "credit"
                          ? "border-[#820AD1] bg-purple-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#820AD1]" />
                      <p className="font-bold text-gray-900">Cartão de Crédito</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("pix")}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === "pix"
                          ? "border-[#820AD1] bg-purple-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <Circle className="w-8 h-8 mx-auto mb-2 text-[#820AD1]" />
                      <p className="font-bold text-gray-900">PIX</p>
                    </button>
                  </div>
                </div>

                {/* Informações sobre Perfect Pay */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-[#820AD1]">
                  <div className="text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-[#820AD1]" />
                    <h5 className="font-bold text-gray-900 mb-2 text-lg">Checkout Seguro Perfect Pay</h5>
                    <p className="text-gray-600 mb-4">
                      Ao clicar em "Ir para Pagamento", você será redirecionado para a página segura da Perfect Pay para finalizar sua compra.
                    </p>
                    <div className="bg-white rounded-lg p-4 inline-block">
                      <p className="text-sm text-gray-600 mb-1">Valor a pagar:</p>
                      <p className="text-3xl font-bold text-[#820AD1]">{selectedPlan.price}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-[#820AD1]" />
                  <span>Pagamento 100% seguro e criptografado pela Perfect Pay</span>
                </div>
              </div>
            )}

            {/* Footer com Botões */}
            <div className="p-6 border-t bg-gray-50 flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Voltar
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                  className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
                    ((currentStep === 1 && canProceedStep1) ||
                      (currentStep === 2 && canProceedStep2))
                      ? "bg-gradient-to-r from-[#820AD1] to-[#A855F7] text-white hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={handleFinalizePurchase}
                  disabled={!paymentMethod}
                  className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
                    paymentMethod
                      ? "bg-gradient-to-r from-[#820AD1] to-[#A855F7] text-white hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Ir para Pagamento
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona?
            </h2>
            <p className="text-lg text-gray-600">
              Processo simples em 3 passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#820AD1] to-[#A855F7] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Escolha seu Plano
              </h3>
              <p className="text-gray-600">
                Selecione o aumento de limite ideal para você
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-[#820AD1] to-[#A855F7] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Realize o Pagamento
              </h3>
              <p className="text-gray-600">
                Pagamento seguro e processamento imediato
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-[#820AD1] to-[#A855F7] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Receba seu Aumento
              </h3>
              <p className="text-gray-600">
                Consultoria especializada e aumento aprovado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gradient-to-r from-[#820AD1] to-[#A855F7] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white rounded-lg w-10 h-10 flex items-center justify-center">
              <span className="text-[#820AD1] font-black text-2xl italic">N</span>
            </div>
            <h3 className="text-2xl font-bold">Limite Plus</h3>
          </div>
          <p className="text-purple-100 mb-6">
            Consultoria especializada em aumento de limite bancário
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="#" className="hover:text-purple-200 transition-colors">
              Termos de Uso
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-purple-200 transition-colors">
              Política de Privacidade
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-purple-200 transition-colors">
              Contato
            </a>
          </div>
          <p className="text-purple-200 text-sm mt-6">
            © 2024 Limite Plus. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
