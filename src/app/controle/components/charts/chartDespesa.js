import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useSensitiveData } from "@/app/context/SensitiveDataContext";

const ChartDespesa = () => {
  const { sensitiveData } = useSensitiveData();
  const [chartDespesa, setChartDespesa] = useState([]); // Inicializado como array vazio
  const chartRef = useRef(null);

  async function buscaChart() {
    try {
      const response = await fetch(`http://localhost:3000/api/despesa/chart?id=${sensitiveData}`);

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      setChartDespesa(data.response || []); // Garante que seja um array
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  }

  useEffect(() => {
    buscaChart();
  }, []);

  useEffect(() => {
    if (!chartDespesa.length) return; // Aguarda os dados serem carregados

    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Despesa',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: chartDespesa.map((receita) => ({
            value: Number(receita.valor_total), // Garante que seja um número
            name: receita.nome_categoria,
          })),
        },
      ],
    };

    chart.setOption(option);

    // Limpar o gráfico ao desmontar o componente
    return () => {
      chart.dispose();
    };
  }, [chartDespesa]); // Atualiza o gráfico quando chartDespesa muda

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default ChartDespesa;
