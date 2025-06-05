'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ContentCreatorTab } from "@/components/content-creator/ContentCreatorTab";
import { ClassroomTab } from "@/components/classroom/ClassroomTab";
import type { Presentation } from "@/types";
import { BookOpen, LayoutGrid } from 'lucide-react';
import { initialPresentationsData } from '@/lib/data';
//import { initialPresentationsData } from '@/lib/data'; // Externalized seed data (optional but cleaner)

export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setPresentations(initialPresentationsData);
    setCurrentYear(new Date().getFullYear());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && presentations.length > 0) {
      localStorage.setItem('courseDeckPresentations', JSON.stringify(presentations));
    }
  }, [presentations, isMounted]);

  const addPresentation = (newPresentation: Presentation) => {
    setPresentations(prev => [newPresentation, ...prev]);
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading CourseDeck AI...</p>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © CourseDeck AI. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="classroom" className="w-full">
          <TabsList className="mx-auto mb-8 flex overflow-hidden rounded-xl bg-gray-200 p-1 w-fit shadow-sm">
            <TabsTrigger
              value="classroom"
              className="flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-muted-foreground"
            >
              <LayoutGrid className="h-4 w-4" /> Classroom
            </TabsTrigger>
            <TabsTrigger
              value="creator"
              className="flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-muted-foreground"
            >
              <BookOpen className="h-4 w-4" /> Content Creator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classroom">
            <ClassroomTab presentations={presentations} />
          </TabsContent>

          <TabsContent value="creator">
            <ContentCreatorTab addPresentation={addPresentation} />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        {currentYear ? `© ${currentYear} CourseDeck AI. All rights reserved.` : '© CourseDeck AI. All rights reserved.'}
      </footer>
    </div>
  );
}