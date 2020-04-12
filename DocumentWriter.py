from docx import Document


class DocumentWriter:
    def __init__(self, document):
        self.document = document

    def add_heading(self, heading):
        self.document.add_heading(heading,0)