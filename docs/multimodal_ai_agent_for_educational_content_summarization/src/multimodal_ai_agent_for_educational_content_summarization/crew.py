from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import PDFSearchTool
from crewai_tools import TXTSearchTool
from crewai_tools import DOCXSearchTool
from crewai_tools import VisionTool
from crewai_tools import DallETool

@CrewBase
class MultimodalAiAgentForEducationalContentSummarizationCrew():
    """MultimodalAiAgentForEducationalContentSummarization crew"""

    @agent
    def ingestion_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['ingestion_specialist'],
            tools=[PDFSearchTool(), TXTSearchTool(), DOCXSearchTool()],
        )

    @agent
    def summarization_expert(self) -> Agent:
        return Agent(
            config=self.agents_config['summarization_expert'],
            tools=[],
        )

    @agent
    def diagram_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['diagram_specialist'],
            tools=[VisionTool(), DallETool()],
        )

    @agent
    def pdf_generation_expert(self) -> Agent:
        return Agent(
            config=self.agents_config['pdf_generation_expert'],
            tools=[],
        )


    @task
    def categorize_and_prepare_uploads(self) -> Task:
        return Task(
            config=self.tasks_config['categorize_and_prepare_uploads'],
            tools=[PDFSearchTool(), TXTSearchTool(), DOCXSearchTool()],
        )

    @task
    def extract_text_and_diagrams(self) -> Task:
        return Task(
            config=self.tasks_config['extract_text_and_diagrams'],
            tools=[PDFSearchTool()],
        )

    @task
    def process_text_documents(self) -> Task:
        return Task(
            config=self.tasks_config['process_text_documents'],
            tools=[TXTSearchTool(), DOCXSearchTool()],
        )

    @task
    def generate_section_summaries(self) -> Task:
        return Task(
            config=self.tasks_config['generate_section_summaries'],
            tools=[],
        )

    @task
    def extract_and_enhance_diagrams(self) -> Task:
        return Task(
            config=self.tasks_config['extract_and_enhance_diagrams'],
            tools=[VisionTool(), DallETool()],
        )

    @task
    def compile_pdf(self) -> Task:
        return Task(
            config=self.tasks_config['compile_pdf'],
            tools=[],
        )


    @crew
    def crew(self) -> Crew:
        """Creates the MultimodalAiAgentForEducationalContentSummarization crew"""
        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
        )
