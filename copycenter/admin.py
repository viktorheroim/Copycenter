from django.contrib import admin
from .models import Services, PrintPhoto, Laminating, Binding, PrintBW, PrintColour

admin.site.register(Services)
admin.site.register(PrintPhoto)
admin.site.register(Laminating)
admin.site.register(Binding)
admin.site.register(PrintBW)
admin.site.register(PrintColour)