import { Component } from '@angular/core';
import { SemiService } from 'src/app/core/services/semi.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersList: any[] = [];
  selectedExams: any[] = [];
  examList: any[] = [];
  selectedPatientName: any | null = null;
  patientList: any[] = [];
  attentionDate: any;
  constructor(private semiService: SemiService) {}
  ngOnInit(): void {
    this.GetPatients();
    this.GetExams();
    this.GetOrders();
  }

  GetPatients() {
    this.semiService.GetPatients().subscribe({
      next: (data) => {
        this.patientList = data as any[];
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  GetExams() {
    this.semiService.GetExams().subscribe({
      next: (data) => {
        this.examList = data as any[];
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  GetOrders() {
    this.semiService.GetOrders().subscribe({
      next: (data) => {
        this.ordersList = data as any[];
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  checkBoxChange(event: any, exam: any) {
    if (event.target.checked) {
      this.selectedExams.push(exam.id);
    } else {
      this.selectedExams = this.selectedExams.filter(
        (x) => x.exam.id !== exam.id,
      );
    }
  }

  createOrder() {
    if (!this.selectedPatientName) {
      alert('Seleccione un paciente');
      return;
    }
    if (!this.attentionDate) {
      alert('Ingrese la fecha de atención');
      return;
    }
    if (this.selectedExams.length === 0) {
      alert('Seleccione al menos un examen');
      return;
    }

    if (this.selectedPatientName == null) {
      alert('Seleccione un paciente');
      return;
    }

    if (!this.selectedPatientName) {
      alert('Seleccione un paciente');
      return;
    }

    const orderRequest = {
      PatientName: this.selectedPatientName,
      AttentionDate: this.attentionDate,
      ExamsId: this.selectedExams,
    };

    this.semiService.CreateOrder(orderRequest).subscribe({
      next: (res) => {
        alert('Orden creada correctamente!');
        this.selectedExams = [];
        this.attentionDate = '';
        this.selectedPatientName = null;
        this.GetOrders();
      },
      error: (err) =>
        alert('Error al crear orden: ' + err.error?.Error || err.message),
    });
  }
}
