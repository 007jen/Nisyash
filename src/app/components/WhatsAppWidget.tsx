import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '911234567890'; // Replace with actual WhatsApp number

  const quickActions = [
    { text: 'Get a quotation', message: 'Hi, I would like to get a quotation for corporate gifts.' },
    { text: 'Custom branding enquiry', message: 'Hi, I need information about custom branding options.' },
    { text: 'Bulk order support', message: 'Hi, I want to place a bulk order.' },
    { text: 'Product catalogue', message: 'Hi, I would like to see your product catalogue.' }
  ];

  const handleQuickAction = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 w-80 animate-in slide-in-from-bottom-5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Chat with us</CardTitle>
                  <CardDescription className="text-xs">We're online!</CardDescription>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Hello! Welcome to Nishyash Corporation. Looking for corporate or personalised gifting solutions?
            </p>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left text-sm h-auto py-2 px-3"
                  onClick={() => handleQuickAction(action.message)}
                >
                  {action.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
}
