import frappe
from frappe.model.document import Document
from frappe.utils import nowdate


class EvidenceRecord(Document):
    def validate(self):
        self.validate_verification()
        self.validate_source_document()

    def validate_verification(self):
        if self.verification_status == "Verified":
            if not self.verified_by:
                frappe.throw(
                    "Verified By is required when Verification Status is Verified."
                )

            if not self.verified_date:
                self.verified_date = nowdate()

        elif self.verified_date and not self.verified_by:
            frappe.throw(
                "Verified By is required when Verified Date is populated."
            )

    def validate_source_document(self):
        if self.source_document and not self.source_doctype:
            frappe.throw(
                "Source DocType is required when Source Document is populated."
            )
