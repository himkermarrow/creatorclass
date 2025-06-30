'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { ContentCreatorTab } from "@/components/content-creator/ContentCreatorTab";
import { ClassroomTab } from "@/components/classroom/ClassroomTab";
import type { Presentation } from '@/types';
import { BookOpen, LayoutGrid } from 'lucide-react';

export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/presentations');
        const data = await res.json();
        setPresentations(data.presentations || []);
      } catch (error) {
        console.error('Failed to load presentations:', error);
        setPresentations([]);
      } finally {
        setIsMounted(true);
        setCurrentYear(new Date().getFullYear());
      }
    };

    fetchData();
  }, []);

  const addPresentation = (newPresentation: Presentation) => {
    setPresentations(prev => [newPresentation, ...prev]);
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading Creator Class AI...</p>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t">
          © Creator Class AI. All rights reserved.
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
        {currentYear ? `© ${currentYear} Creator Class AI. All rights reserved.` : '© Creator Class AI. All rights reserved.'}
      </footer>
    </div>
  );
}