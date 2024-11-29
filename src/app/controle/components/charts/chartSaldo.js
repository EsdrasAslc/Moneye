import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useSensitiveData } from "@/app/context/SensitiveDataContext";

const ChartSaldo = () => {
  const { sensitiveData } = useSensitiveData();
  const [chartSaldo, setChartSaldo] = useState({});  // Inicializando como objeto vazio
  const chartRef = useRef(null);

  // Função para buscar os dados da API
  async function buscaChart() {
    try {
      const response = await fetch(`http://localhost:3000/api/saldo/chart?id=${sensitiveData}`);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      setChartSaldo(data);  // Armazena a resposta completa no estado
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);
    }
  }

  // Executa a requisição ao carregar o componente
  useEffect(() => {
    buscaChart();
  }, []); // A dependência vazia significa que essa execução ocorre apenas uma vez ao carregar

  // Quando os dados de chartSaldo são atualizados, renderiza o gráfico
  useEffect(() => {
    if (Object.keys(chartSaldo).length === 0) return;  // Não renderiza até os dados estarem carregados

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
          name: 'Saldo',
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
          data: [
            {
              value: Number(chartSaldo.response.valor_despesa),  // Acessando os valores do estado
              name: 'Despesas',
            },
            {
              value: Number(chartSaldo.response.valor_receita),  // Acessando os valores do estado
              name: 'Receitas',
            },
          ],
        },
      ],
    };

    chart.setOption(option);

    // Limpeza do gráfico ao desmontar o componente
    return () => {
      chart.dispose();
    };
  }, [chartSaldo]);  // Re-renderiza o gráfico sempre que 'chartSaldo' mudar

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default ChartSaldo;
