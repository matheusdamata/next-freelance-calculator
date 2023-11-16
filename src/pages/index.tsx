import Head from 'next/head'
import {
  Flex,
  Text,
  Stack,
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  InputGroup,
  Icon,
  InputLeftAddon,
  useToast,
  IconButton,
} from '@chakra-ui/react'
import { FaClock, FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { dateFormatter, priceFormatter } from '@/utils/format'

type FeatureListProps = {
  name: string
  hours: number
}

export default function Home() {
  const toast = useToast()

  const [featureList, setFeatureList] = useState<FeatureListProps[]>([])

  const [valueHours, setValueHours] = useState('')
  const [featureName, setFeatureName] = useState('')
  const [featureHours, setFeatureHours] = useState('')

  const handleCreateFeature = () => {
    if (!featureName) {
      return toast({
        title: 'Digite um nome',
        description: 'Antes de inserir, define um nome para sua feature!',
        status: 'error',
        duration: 3500,
        isClosable: true,
      })
    }

    if (!featureHours) {
      return toast({
        title: 'Digite as horas',
        description:
          'Antes de inserir, define quanto tempo gastará para concluir!',
        status: 'error',
        duration: 3500,
        isClosable: true,
      })
    }

    const data = {
      name: featureName,
      hours: parseInt(featureHours),
    }

    setFeatureList([...featureList, data])

    setFeatureName('')
    setFeatureHours('')
  }

  const removeFeature = (index: number) => {
    const newArray = featureList.filter((_, i) => i !== index)
    setFeatureList(newArray)
  }

  const handleCalculateHoursSpent = () => {
    const totalHours = featureList.reduce(
      (acc, feature) => acc + feature.hours,
      0,
    )

    const hours = dateFormatter.format(totalHours)

    return hours
  }

  const handleCalculateTotalValue = () => {
    const totalHours = featureList.reduce(
      (acc, feature) => acc + feature.hours,
      0,
    )

    const totalValue = priceFormatter.format(
      totalHours ? totalHours * parseInt(valueHours) : 0,
    )

    return totalValue
  }

  return (
    <>
      <Head>
        <title>Home | OrçaAqui.dev</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        direction="column"
        gap="4"
      >
        <Card
          w={{
            base: '95%',
            lg: 'unset',
          }}
          bg="gray.700"
          boxShadow="xl"
        >
          <CardHeader
            fontSize={{
              base: 'lg',
              lg: '2xl',
            }}
            fontWeight="semibold"
            borderBottom="1px solid"
            borderColor="gray.800"
          >
            <Stack direction="row" align="center" justify="space-between">
              <Text color="gray.300">Valor por hora 👉🏻</Text>

              <InputGroup w="max-content">
                <InputLeftAddon bg="gray.900" border="0" pointerEvents="none">
                  <Icon as={FaClock} color="whatsapp.600" />
                </InputLeftAddon>
                <Input
                  w="100px"
                  borderColor="transparent"
                  focusBorderColor="whatsapp.500"
                  color="gray.500"
                  bg="gray.900"
                  onChange={(e) => setValueHours(e.target.value)}
                  value={valueHours}
                />
              </InputGroup>
            </Stack>
          </CardHeader>
          <CardBody>
            <Stack direction="row" spacing={3}>
              <Input
                placeholder="Digite o nome da feature"
                borderColor="transparent"
                focusBorderColor="whatsapp.500"
                color="gray.500"
                bg="gray.900"
                onChange={(e) => setFeatureName(e.target.value)}
                value={featureName}
              />

              <Input
                type="number"
                w="150px"
                placeholder="Horas"
                borderColor="transparent"
                focusBorderColor="whatsapp.500"
                color="gray.500"
                bg="gray.900"
                onChange={(e) => setFeatureHours(e.target.value)}
                value={featureHours}
              />

              <Button
                colorScheme="whatsapp"
                bg="whatsapp.600"
                onClick={handleCreateFeature}
              >
                +
              </Button>
            </Stack>

            <Flex direction="column" gap="2" mt="5">
              {featureList.map((feature, index) => (
                <Flex
                  key={index}
                  align="center"
                  justify="space-between"
                  border="1px solid"
                  borderColor="whatsapp.600"
                  borderRadius={6}
                  p="2"
                >
                  <Text
                    fontSize={{
                      base: 'sm',
                      lg: 'lg',
                    }}
                    color="gray.300"
                  >
                    {feature.name} - {dateFormatter.format(feature.hours)} horas
                  </Text>

                  <IconButton
                    colorScheme="red"
                    aria-label="Remover feature"
                    icon={<FaTrash />}
                    onClick={() => removeFeature(index)}
                  />
                </Flex>
              ))}
            </Flex>
          </CardBody>

          <CardFooter
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="100%"
            fontSize={{
              base: 'xs',
              lg: 'md',
            }}
            borderTop="1px solid"
            borderColor="gray.800"
          >
            <Text as="span" color="gray.400">
              Total de{' '}
              <Text as="strong" color="whatsapp.600">
                {handleCalculateHoursSpent()}:00
              </Text>{' '}
              horas com o orçamento de{' '}
              <Text as="strong" color="whatsapp.600">
                {handleCalculateTotalValue()}.
              </Text>
            </Text>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )
}
