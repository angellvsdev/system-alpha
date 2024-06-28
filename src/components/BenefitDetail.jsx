import React from 'react';
import { Card, CardBody, Typography, List, ListItem, ListItemSuffix, Badge } from '@material-tailwind/react';

// Componente funcional para mostrar los detalles de un beneficio
const BenefitDetail = ({ benefit }) => {
  // Verificaciones para asegurarnos de que los datos están disponibles
  const id = benefit?.id || 'N/A';
  const userName = benefit?.user?.name || 'N/A';
  const details = benefit?.details || 'N/A';
  const requestDescription = benefit?.request?.message || 'N/A';
  const status = benefit?.status === 'APPROVED' ? 'Aprobado' : 'Rechazado';
  const statusColor = benefit?.status === 'APPROVED' ? 'green' : 'red';
  const creationDate = benefit?.creationDate ? new Date(benefit.creationDate).toLocaleDateString() : 'N/A';
  const benefitItems = benefit?.benefitItems || [];

  return (
    <div className="container h-screen mx-auto">
      <div className="absolute top-0 left-0 flex overflow-y-scroll no-scrollbar flex-col w-screen h-screen bg-gradient-to-r from-red-800 to-red-700">
        <h2 className="mx-auto my-6 text-4xl font-bold text-slate-300 bg-none plus-jakarta-sans-light">
          Detalles del Beneficio
        </h2>
        <div className="flex flex-col self-center p-5 mt-4 rounded-md shadow-md bg-red-950 shadow-black">
          {/* Card para mostrar los detalles del beneficio */}
          <Card className="max-w-3xl w-full bg-red-950 shadow-lg rounded-lg border border-gray-200">
            <CardBody>
              {/* Título principal del detalle del beneficio */}
              <Typography
                variant="h4"
                color="gray"
                className="text-center mb-6 plus-jakarta-sans-light"
              >
                Detalles del Beneficio
              </Typography>

              {/* Sección de ID del beneficio */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  ID:
                </Typography>
                <Typography color="gray">{id}</Typography>
              </div>

              {/* Sección de usuario */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  Usuario:
                </Typography>
                <Typography color="gray">{userName}</Typography>
              </div>

              {/* Sección de detalles */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  Detalles:
                </Typography>
                <Typography color="gray">{details}</Typography>
              </div>

              {/* Sección de solicitud */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  Solicitud:
                </Typography>
                <Typography color="gray">{requestDescription}</Typography>
              </div>

              {/* Sección de estado */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  Estado:
                </Typography>
                <Typography color={statusColor}>{status}</Typography>
              </div>

              {/* Sección de fecha de creación */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  Fecha de Creación:
                </Typography>
                <Typography color="gray">{creationDate}</Typography>
              </div>

              {/* Sección de ítems del beneficio */}
              <div className="mb-4">
                <Typography
                  variant="h6"
                  color="gray"
                  className="font-semibold plus-jakarta-sans-light"
                >
                  Ítems del Beneficio:
                </Typography>
                {/* Lista de ítems del beneficio */}
                <List className="mt-2">
                  {benefitItems.map((item, index) => (
                    <ListItem key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
                      <span>{item.item.name}</span>
                      <ListItemSuffix>
                        <Badge color="blue">{item.quantity}</Badge>
                      </ListItemSuffix>
                    </ListItem>
                  ))}
                </List>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BenefitDetail;
